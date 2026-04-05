const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

function getApiKey() {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (geminiKey && geminiKey !== 'your_gemini_api_key_here') {
    return { provider: 'gemini', key: geminiKey };
  }
  if (openaiKey && openaiKey !== 'your_openai_api_key_here') {
    return { provider: 'openai', key: openaiKey };
  }
  return null;
}

function buildPrompt(resumeText, jobDescription = '') {
  const jobContext = jobDescription
    ? `\n\nTarget Job Description:\n${jobDescription}`
    : '';

  return `You are an expert career coach and resume reviewer. Analyze the following resume and provide structured feedback in valid JSON format only. Do not include any text outside the JSON.${jobContext}

Resume:
${resumeText.slice(0, 6000)}

Respond with this exact JSON structure:
{
  "summary": "2-3 sentence overall assessment of the resume",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "improvements": [
    {"area": "area name", "suggestion": "specific actionable suggestion", "priority": "high|medium|low"},
    {"area": "area name", "suggestion": "specific actionable suggestion", "priority": "high|medium|low"}
  ],
  "extractedData": {
    "name": "candidate name if found or null",
    "skills": ["skill1", "skill2"],
    "experience": [{"title": "Job Title", "company": "Company Name", "duration": "dates"}],
    "education": [{"degree": "degree", "institution": "school", "year": "year"}]
  },
  "atsScore": 75,
  "keywordSuggestions": ["keyword1", "keyword2"]${jobDescription ? ',\n  "jobMatchScore": 70,\n  "missingSkills": ["skill1", "skill2"],\n  "matchAnalysis": "brief analysis of resume vs job description fit"' : ''}
}`;
}

async function callGemini(prompt, apiKey) {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from Gemini API');
  return text;
}

async function callOpenAI(prompt, apiKey) {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('No response from OpenAI API');
  return text;
}

function parseJsonResponse(text) {
  // Strip markdown code fence if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    // Try to extract JSON from the response
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('Failed to parse AI response as JSON');
  }
}

export async function analyzeWithAI(resumeText, jobDescription = '') {
  const apiConfig = getApiKey();

  if (!apiConfig) {
    return null; // No API key configured — fall back to heuristic analysis
  }

  const prompt = buildPrompt(resumeText, jobDescription);

  let responseText;
  if (apiConfig.provider === 'gemini') {
    responseText = await callGemini(prompt, apiConfig.key);
  } else {
    responseText = await callOpenAI(prompt, apiConfig.key);
  }

  return parseJsonResponse(responseText);
}

export function hasApiKey() {
  return getApiKey() !== null;
}

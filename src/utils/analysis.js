// ── Stop Words ──
const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with','by',
  'from','is','are','was','were','be','been','being','have','has','had','do',
  'does','did','will','would','could','should','may','might','shall','can',
  'this','that','these','those','i','you','he','she','it','we','they','my',
  'your','his','her','its','our','their','what','which','who','whom','when',
  'where','why','how','all','each','every','both','few','more','most','other',
  'some','such','no','not','only','own','same','so','than','too','very',
  'just','also','about','up','out','if','then','as','into','through','during',
  'before','after','above','below','between','under','again','further','once',
  'here','there','any','new','work','worked','working','using','used','use',
  'including','included','include','able','well','also','etc','per','via',
]);

// ── Section Detection Patterns ──
const SECTION_PATTERNS = {
  'Summary / Objective': /\b(summary|professional\s+summary|profile|objective|about\s+me|personal\s+statement|career\s+objective)\b/i,
  'Experience': /\b(experience|work\s+history|employment|professional\s+experience|work\s+experience|career\s+history)\b/i,
  'Education': /\b(education|academic|degree|university|college|school|certification|certifications|qualification)\b/i,
  'Skills': /\b(skills|technical\s+skills|core\s+competencies|technologies|tools|proficiencies|expertise|competencies)\b/i,
  'Projects': /\b(projects|portfolio|personal\s+projects|key\s+projects|academic\s+projects)\b/i,
  'Awards / Honors': /\b(awards|honors|achievements|recognition|accomplishments)\b/i,
  'Volunteer': /\b(volunteer|community|service|nonprofit)\b/i,
  'Languages': /\b(languages|fluent|proficient\s+in|native\s+speaker)\b/i,
  'Contact Info': /\b(email|phone|linkedin|github|portfolio|website|address|contact)\b/i,
};

// ── Achievement Patterns ──
const ACHIEVEMENT_PATTERNS = [
  /\d+[%]/g,
  /\$[\d,.]+[kmb]?\b/gi,
  /\b\d{1,3}(?:,\d{3})*\+?\s*(?:users|customers|clients|employees|members|downloads|installs|subscribers)/gi,
  /(?:increased|decreased|reduced|improved|grew|boosted|saved|generated|delivered|achieved)\s+.*?\d+/gi,
  /\b\d+x\b/gi,
  /\btop\s+\d+[%]?\b/gi,
  /\b\d+\+?\s+(?:years?|months?)\b/gi,
];

// ── Action Verbs ──
const STRONG_ACTION_VERBS = new Set([
  'achieved','administered','analyzed','architected','automated','built','championed',
  'collaborated','conceptualized','configured','consolidated','coordinated','created',
  'decreased','delivered','deployed','designed','developed','directed','drove',
  'eliminated','enabled','engineered','enhanced','established','executed','expanded',
  'facilitated','formulated','founded','generated','grew','headed','identified',
  'implemented','improved','increased','influenced','initiated','innovated','integrated',
  'launched','led','managed','mentored','migrated','modernized','negotiated','optimized',
  'orchestrated','overhauled','partnered','pioneered','planned','presented','prioritized',
  'produced','published','raised','redesigned','reduced','refactored','restructured',
  'revamped','scaled','simplified','spearheaded','streamlined','strengthened',
  'supervised','surpassed','trained','transformed','tripled','visualized',
]);

const WEAK_VERBS = new Set([
  'responsible for','helped','assisted','worked on','involved in','participated in',
  'tasked with','handled','did','made','got','went',
]);

// ── Tech Skills ──
const TECH_SKILLS = new Set([
  'javascript','typescript','python','java','c++','c#','ruby','go','rust','php',
  'swift','kotlin','scala','r','matlab','perl','html','css','sass','less',
  'react','angular','vue','svelte','next.js','nuxt','node.js','express','django',
  'flask','spring','rails','laravel','.net','asp.net',
  'aws','azure','gcp','docker','kubernetes','terraform','ansible','jenkins',
  'git','github','gitlab','bitbucket','jira','confluence',
  'sql','mysql','postgresql','mongodb','redis','elasticsearch','dynamodb','firebase',
  'graphql','rest','api','grpc','websocket',
  'tensorflow','pytorch','scikit-learn','pandas','numpy','keras',
  'figma','sketch','adobe xd','photoshop','illustrator',
  'tableau','power bi','excel','google analytics',
  'linux','bash','powershell','nginx','apache',
  'agile','scrum','kanban','waterfall','devops','ci/cd',
  'machine learning','deep learning','nlp','computer vision','data science',
  'blockchain','iot','microservices','serverless','oauth','jwt',
]);

// ── Analysis Functions ──

export function detectSections(text) {
  const results = {};
  for (const [name, pattern] of Object.entries(SECTION_PATTERNS)) {
    results[name] = pattern.test(text);
  }
  return results;
}

export function detectAchievements(text) {
  const found = new Set();
  for (const pattern of ACHIEVEMENT_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach((m) => found.add(m.trim()));
    }
  }
  return [...found];
}

export function detectActionVerbs(text) {
  const lower = text.toLowerCase();
  const strong = [];
  const weak = [];

  STRONG_ACTION_VERBS.forEach((verb) => {
    if (lower.includes(verb)) strong.push(verb);
  });

  WEAK_VERBS.forEach((verb) => {
    if (lower.includes(verb)) weak.push(verb);
  });

  return { strong, weak };
}

export function extractKeywords(text) {
  if (!text || text.trim().length < 10) return [];

  const multiWordPatterns = [
    /machine learning/gi, /deep learning/gi, /data structures/gi, /natural language/gi,
    /ci\/cd/gi, /cross-functional/gi, /user research/gi, /project management/gi,
    /problem solving/gi, /team building/gi, /data analysis/gi, /software development/gi,
    /version control/gi, /design thinking/gi, /a\/b testing/gi, /user experience/gi,
    /business intelligence/gi, /cloud computing/gi, /data visualization/gi,
  ];

  const keywords = new Set();

  multiWordPatterns.forEach((p) => {
    const matches = text.match(p);
    if (matches) matches.forEach((m) => keywords.add(m.toLowerCase()));
  });

  const lower = text.toLowerCase();
  const words = lower.match(/\b[a-z][a-z0-9+#.-]{2,}\b/g) || [];
  const freq = {};
  words.forEach((w) => {
    if (!STOP_WORDS.has(w) && w.length >= 3) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });

  Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .forEach(([word]) => keywords.add(word));

  return [...keywords];
}

export function extractSkills(text) {
  const lower = text.toLowerCase();
  const found = [];

  TECH_SKILLS.forEach((skill) => {
    if (skill.length <= 3) {
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(lower)) found.push(skill);
    } else {
      if (lower.includes(skill)) found.push(skill);
    }
  });

  return [...new Set(found)].sort();
}

export function matchKeywords(resumeText, keywords) {
  if (keywords.length === 0) return { score: 0, matched: [], missing: [] };

  const lower = resumeText.toLowerCase();
  const matched = [];
  const missing = [];

  keywords.forEach((kw) => {
    if (lower.includes(kw)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  return {
    score: keywords.length > 0 ? Math.round((matched.length / keywords.length) * 100) : 0,
    matched,
    missing,
  };
}

// ── Readability ──

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const vowelGroups = word.match(/[aeiouy]{1,2}/g);
  return vowelGroups ? vowelGroups.length : 1;
}

export function analyzeReadability(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const wordCount = words.length;
  const sentenceCount = Math.max(sentences.length, 1);
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 0;

  const fleschEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const clampedFlesch = Math.max(0, Math.min(100, Math.round(fleschEase)));

  const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  const clampedGrade = Math.max(0, Math.round(gradeLevel * 10) / 10);

  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
  const complexPercent = wordCount > 0 ? Math.round((complexWords / wordCount) * 100) : 0;

  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const bullets = (text.match(/^[\s]*[-•*▪►◦]\s/gm) || []).length;

  let level, description;
  if (clampedFlesch >= 60) {
    level = 'good';
    description = 'Easy to read — appropriate for a resume';
  } else if (clampedFlesch >= 40) {
    level = 'ok';
    description = 'Moderately readable — consider simplifying some sentences';
  } else {
    level = 'poor';
    description = 'Difficult to read — shorten sentences and use simpler words';
  }

  return {
    fleschEase: clampedFlesch,
    gradeLevel: clampedGrade,
    wordCount,
    sentenceCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    complexPercent,
    paragraphs,
    bullets,
    level,
    description,
  };
}

// ── Contact Detection ──

export function detectContactInfo(text) {
  return {
    email: /[\w.-]+@[\w.-]+\.\w{2,}/.test(text),
    phone: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text),
    linkedin: /linkedin\.com/i.test(text),
    github: /github\.com/i.test(text),
    portfolio: /portfolio|website|personal\s+site/i.test(text),
  };
}

// ── Length Assessment ──

export function assessLength(wordCount) {
  if (wordCount < 200) return { rating: 'too-short', message: 'Resume seems too short (under 200 words)' };
  if (wordCount < 400) return { rating: 'short', message: 'Resume is on the shorter side (under 400 words)' };
  if (wordCount <= 800) return { rating: 'good', message: 'Resume length is in the ideal range' };
  if (wordCount <= 1200) return { rating: 'ok', message: 'Resume is slightly long — consider trimming for a 1-page format' };
  return { rating: 'long', message: 'Resume is quite long — recruiters prefer concise resumes (1-2 pages)' };
}

// ── Score Calculation ──

export function calculateScore(sections, keywordResult, achievements, actionVerbs, readability, contactInfo, wordCount) {
  const breakdown = {};

  let structScore = 0;
  const critical = ['Summary / Objective', 'Experience', 'Education', 'Skills'];
  critical.forEach((s) => { if (sections[s]) structScore += 5; });
  if (sections['Projects']) structScore += 3;
  if (sections['Contact Info']) structScore += 2;
  breakdown.structure = Math.min(25, structScore);

  if (keywordResult.score > 0) {
    breakdown.keywords = Math.round(keywordResult.score * 0.25);
  } else {
    breakdown.keywords = 12;
  }

  let impactScore = 0;
  impactScore += Math.min(10, achievements.length * 2.5);
  impactScore += Math.min(10, actionVerbs.strong.length * 1.5);
  impactScore -= Math.min(5, actionVerbs.weak.length * 1.5);
  breakdown.impact = Math.max(0, Math.min(25, Math.round(impactScore)));

  let readScore = 0;
  if (readability.level === 'good') readScore += 10;
  else if (readability.level === 'ok') readScore += 6;
  else readScore += 2;

  if (readability.bullets >= 3) readScore += 5;
  else if (readability.bullets >= 1) readScore += 2;

  const lenAssess = assessLength(wordCount);
  if (lenAssess.rating === 'good') readScore += 5;
  else if (lenAssess.rating === 'ok' || lenAssess.rating === 'short') readScore += 3;
  else readScore += 1;

  if (contactInfo.email) readScore += 2;
  if (contactInfo.phone || contactInfo.linkedin) readScore += 3;
  breakdown.readability = Math.min(25, readScore);

  const total = breakdown.structure + breakdown.keywords + breakdown.impact + breakdown.readability;

  return { total: Math.min(100, total), breakdown };
}

// ── Suggestion Generation ──

export function generateSuggestions(sections, keywordResult, achievements, actionVerbs, readability, contactInfo, wordCount) {
  const suggestions = [];

  if (!sections['Summary / Objective']) {
    suggestions.push({ priority: 'high', text: 'Add a Professional Summary section', detail: 'A 2-3 sentence summary at the top helps recruiters quickly understand your profile and value proposition.' });
  }
  if (!sections['Skills']) {
    suggestions.push({ priority: 'high', text: 'Add a Skills section', detail: 'List your key technical and soft skills. ATS systems scan for specific skills keywords.' });
  }
  if (!sections['Experience']) {
    suggestions.push({ priority: 'high', text: 'Add a Work Experience section', detail: 'Experience is the most important section. List roles with company, dates, and accomplishments.' });
  }
  if (!sections['Education']) {
    suggestions.push({ priority: 'medium', text: 'Add an Education section', detail: 'Include your degree(s), institution, and graduation date.' });
  }
  if (!sections['Contact Info']) {
    suggestions.push({ priority: 'high', text: 'Ensure contact information is clearly visible', detail: 'Include email, phone number, and LinkedIn URL at the top of your resume.' });
  }
  if (!contactInfo.email) {
    suggestions.push({ priority: 'high', text: 'Add an email address', detail: 'Use a professional email address (e.g., firstname.lastname@email.com).' });
  }
  if (!contactInfo.linkedin) {
    suggestions.push({ priority: 'low', text: 'Consider adding your LinkedIn profile URL', detail: 'Most recruiters will look you up on LinkedIn. Include a custom URL.' });
  }

  if (keywordResult.missing && keywordResult.missing.length > 5) {
    suggestions.push({ priority: 'high', text: 'Improve keyword alignment with the job description', detail: `Your resume is missing ${keywordResult.missing.length} keywords. Consider incorporating: ${keywordResult.missing.slice(0, 8).join(', ')}.` });
  } else if (keywordResult.missing && keywordResult.missing.length > 0) {
    suggestions.push({ priority: 'medium', text: 'Add a few more keywords from the job description', detail: `Consider adding: ${keywordResult.missing.slice(0, 5).join(', ')}.` });
  }

  if (achievements.length === 0) {
    suggestions.push({ priority: 'high', text: 'Add quantified achievements', detail: 'Use numbers, percentages, and metrics. e.g., "Reduced load time by 40%" or "Managed a team of 12."' });
  } else if (achievements.length < 3) {
    suggestions.push({ priority: 'medium', text: 'Add more quantified results', detail: `You have ${achievements.length} quantified achievement(s). Aim for at least one per role.` });
  }

  if (actionVerbs.weak.length > 0) {
    suggestions.push({ priority: 'medium', text: 'Replace weak phrases with strong action verbs', detail: `Found weak phrases: "${actionVerbs.weak.join('", "')}". Replace with strong verbs like "developed," "led," "optimized."` });
  }
  if (actionVerbs.strong.length < 3) {
    suggestions.push({ priority: 'medium', text: 'Use more impactful action verbs', detail: 'Start each bullet with a strong verb: achieved, built, designed, implemented, launched, optimized, scaled.' });
  }

  if (readability.level === 'poor') {
    suggestions.push({ priority: 'high', text: 'Improve readability — sentences are too complex', detail: `Avg. ${readability.avgWordsPerSentence} words/sentence. Aim for 15-20 words.` });
  } else if (readability.avgWordsPerSentence > 25) {
    suggestions.push({ priority: 'medium', text: 'Shorten some sentences for clarity', detail: `Your average sentence length is ${readability.avgWordsPerSentence} words.` });
  }

  if (readability.bullets < 3) {
    suggestions.push({ priority: 'medium', text: 'Use more bullet points for experience entries', detail: 'Bullet points (3-5 per role) make your resume scannable. Recruiters spend ~7 seconds on initial review.' });
  }

  const lenAssess = assessLength(wordCount);
  if (lenAssess.rating === 'too-short') {
    suggestions.push({ priority: 'high', text: lenAssess.message, detail: 'Expand on your experience, skills, and achievements. A well-written resume typically has 400-800 words.' });
  } else if (lenAssess.rating === 'long') {
    suggestions.push({ priority: 'medium', text: lenAssess.message, detail: 'Remove outdated or irrelevant experience. Focus on the last 10-15 years.' });
  }

  // Positive feedback
  if (achievements.length >= 3) {
    suggestions.push({ priority: 'positive', text: 'Strong use of quantified achievements', detail: `Found ${achievements.length} quantified results. This effectively demonstrates your impact.` });
  }
  if (actionVerbs.strong.length >= 5) {
    suggestions.push({ priority: 'positive', text: 'Good use of strong action verbs', detail: `Found ${actionVerbs.strong.length} impactful action verbs.` });
  }
  if (keywordResult.score >= 70) {
    suggestions.push({ priority: 'positive', text: 'Strong keyword match with job description', detail: `${keywordResult.score}% keyword alignment. Your resume is well-tailored.` });
  }
  if (readability.level === 'good' && readability.bullets >= 3) {
    suggestions.push({ priority: 'positive', text: 'Well-formatted and easy to read', detail: 'Good readability score and use of bullet points for scannability.' });
  }

  const priorityOrder = { high: 0, medium: 1, low: 2, positive: 3 };
  suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return suggestions;
}

// ── Report Generation ──

export function buildReport(total, breakdown, sections, keywordResult, achievements, actionVerbs, readability, suggestions, skills) {
  const lines = [];
  lines.push('='.repeat(60));
  lines.push('  AI RESUME ANALYSIS REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Overall Score: ${total} / 100`);
  lines.push('');
  lines.push('Score Breakdown:');
  lines.push(`  Structure:   ${breakdown.structure}/25`);
  lines.push(`  Keywords:    ${breakdown.keywords}/25`);
  lines.push(`  Impact:      ${breakdown.impact}/25`);
  lines.push(`  Readability: ${breakdown.readability}/25`);
  lines.push('');
  lines.push('-'.repeat(40));
  lines.push('SECTIONS DETECTED:');
  Object.entries(sections).forEach(([name, found]) => {
    lines.push(`  ${found ? '[OK]' : '[--]'} ${name}`);
  });
  lines.push('');
  lines.push('-'.repeat(40));
  lines.push('READABILITY:');
  lines.push(`  Flesch Reading Ease: ${readability.fleschEase}/100 (${readability.description})`);
  lines.push(`  Grade Level: ${readability.gradeLevel}`);
  lines.push(`  Word Count: ${readability.wordCount}`);
  lines.push(`  Avg Words/Sentence: ${readability.avgWordsPerSentence}`);
  lines.push('');

  if (skills.length > 0) {
    lines.push('-'.repeat(40));
    lines.push('SKILLS DETECTED:');
    lines.push(`  ${skills.join(', ')}`);
    lines.push('');
  }

  if (achievements.length > 0) {
    lines.push('-'.repeat(40));
    lines.push('QUANTIFIED ACHIEVEMENTS:');
    achievements.forEach((a) => lines.push(`  - ${a}`));
    lines.push('');
  }

  if (keywordResult.matched && keywordResult.matched.length > 0) {
    lines.push('-'.repeat(40));
    lines.push(`KEYWORD MATCH: ${keywordResult.score}%`);
    lines.push(`  Matched: ${keywordResult.matched.join(', ')}`);
    if (keywordResult.missing.length > 0) {
      lines.push(`  Missing: ${keywordResult.missing.join(', ')}`);
    }
    lines.push('');
  }

  lines.push('-'.repeat(40));
  lines.push('SUGGESTIONS:');
  suggestions.forEach((s, i) => {
    const tag = s.priority === 'positive' ? 'STRENGTH' : s.priority.toUpperCase();
    lines.push(`  ${i + 1}. [${tag}] ${s.text}`);
    lines.push(`     ${s.detail}`);
  });
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by AI Resume Analyzer');
  lines.push('='.repeat(60));

  return lines.join('\n');
}

import { useState, useCallback, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { parseFile, isValidFile, validateFileSize } from '../services/fileParser';
import { analyzeWithAI, hasApiKey } from '../services/aiService';
import { ROLE_KEYWORDS } from '../utils/constants';
import { saveToHistory } from '../components/HistoryPanel';
import {
  detectSections,
  detectAchievements,
  detectActionVerbs,
  extractKeywords,
  extractSkills,
  matchKeywords,
  analyzeReadability,
  detectContactInfo,
  calculateScore,
  generateSuggestions,
  buildReport,
} from '../utils/analysis';

const LOADING_STEPS = [
  'Parsing document...',
  'Analyzing structure...',
  'Extracting keywords...',
  'Evaluating readability...',
  'Generating suggestions...',
  'Running AI analysis...',
];

export function useResumeAnalyzer() {
  const [resumeText, setResumeText] = useState(() => {
    return localStorage.getItem('resume-draft') || '';
  });
  const [jobDescription, setJobDescription] = useState(() => {
    return localStorage.getItem('job-draft') || '';
  });
  const [selectedRole, setSelectedRole] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileStatus, setFileStatus] = useState({ message: '', type: 'info' });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [results, setResults] = useState(null);
  const [aiResults, setAiResults] = useState(null);
  const [error, setError] = useState(null);
  const [reportText, setReportText] = useState('');

  const abortRef = useRef(false);

  // Resume text persistence
  const updateResumeText = useCallback((text) => {
    setResumeText(text);
    localStorage.setItem('resume-draft', text);
  }, []);

  // Job description persistence
  const updateJobDescription = useCallback((text) => {
    setJobDescription(text);
    localStorage.setItem('job-draft', text);
  }, []);

  // File upload handler
  const handleFileUpload = useCallback(async (file) => {
    if (!isValidFile(file)) {
      setFileStatus({ message: `Unsupported file type. Use PDF, DOCX, DOC, TXT, or Markdown.`, type: 'error' });
      return;
    }

    if (!validateFileSize(file)) {
      setFileStatus({ message: 'File too large (max 10MB).', type: 'error' });
      return;
    }

    setFileStatus({ message: `Parsing "${file.name}"...`, type: 'info' });
    setFileName(file.name);

    try {
      const text = await parseFile(file);
      updateResumeText(text);
      setFileStatus({
        message: `Loaded "${file.name}" (${text.length.toLocaleString()} characters)`,
        type: 'success',
      });
    } catch (err) {
      setFileStatus({ message: `Error: ${err.message}`, type: 'error' });
    }
  }, [updateResumeText]);

  // Main analysis function
  const analyze = useCallback(async () => {
    const text = resumeText.trim();

    if (text.length < 30) {
      setError('Please upload a resume or paste at least 30 characters of text.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setAiResults(null);
    abortRef.current = false;

    try {
      // Animate through loading steps
      for (let i = 0; i < LOADING_STEPS.length; i++) {
        if (abortRef.current) return;
        setLoadingStep(LOADING_STEPS[i]);
        await new Promise((r) => setTimeout(r, 300));
      }

      // Get job context
      let jobKeywords = [];
      if (jobDescription.trim().length > 10) {
        jobKeywords = extractKeywords(jobDescription);
      } else if (selectedRole && ROLE_KEYWORDS[selectedRole]) {
        const roleData = ROLE_KEYWORDS[selectedRole];
        jobKeywords = [...roleData.required, ...roleData.preferred];
      }

      // Run all analyses
      const sections = detectSections(text);
      const achievements = detectAchievements(text);
      const actionVerbs = detectActionVerbs(text);
      const keywordResult = matchKeywords(text, jobKeywords);
      const readability = analyzeReadability(text);
      const contactInfo = detectContactInfo(text);
      const skills = extractSkills(text);
      const wordCount = readability.wordCount;

      const { total, breakdown } = calculateScore(
        sections, keywordResult, achievements, actionVerbs, readability, contactInfo, wordCount
      );

      const suggestions = generateSuggestions(
        sections, keywordResult, achievements, actionVerbs, readability, contactInfo, wordCount
      );

      const report = buildReport(
        total, breakdown, sections, keywordResult, achievements, actionVerbs, readability, suggestions, skills
      );

      setResults({
        score: total,
        breakdown,
        sections,
        achievements,
        actionVerbs,
        keywordResult,
        readability,
        contactInfo,
        skills,
        suggestions,
        jobKeywords,
      });

      setReportText(report);

      // Save to history
      saveToHistory({
        score: total,
        wordCount: readability.wordCount,
        skillCount: skills.length,
        role: selectedRole || null,
        breakdown,
      });

      // AI analysis (non-blocking)
      if (hasApiKey()) {
        try {
          const aiData = await analyzeWithAI(text, jobDescription);
          if (aiData && !abortRef.current) {
            setAiResults(aiData);
          }
        } catch (aiErr) {
          console.warn('AI analysis failed:', aiErr.message);
          // Non-critical, don't set error state
        }
      }
    } catch (err) {
      setError(`Analysis error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  }, [resumeText, jobDescription, selectedRole]);

  // Reset
  const reset = useCallback(() => {
    abortRef.current = true;
    setResumeText('');
    setJobDescription('');
    setSelectedRole('');
    setFileName('');
    setFileStatus({ message: '', type: 'info' });
    setIsLoading(false);
    setLoadingStep('');
    setResults(null);
    setAiResults(null);
    setError(null);
    setReportText('');
    localStorage.removeItem('resume-draft');
    localStorage.removeItem('job-draft');
  }, []);

  // Download report
  const downloadReport = useCallback(() => {
    if (!reportText) return;
    
    const doc = new jsPDF();
    doc.setFont('courier', 'normal'); // Use monospaced font for layout alignment
    doc.setFontSize(10);
    
    // Split text into lines that fit within page width (approx 190 max)
    const lines = doc.splitTextToSize(reportText, 190);
    let y = 15;
    const pageHeight = doc.internal.pageSize.height;
    
    lines.forEach(line => {
      if (y > pageHeight - 15) {
        doc.addPage();
        y = 15;
      }
      doc.text(line, 10, y);
      y += 5; // advance y position for next line
    });
    
    // Generate blob instead of saving directly to avoid filename issues in some browsers
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume_analysis_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }, [reportText]);

  // Copy report
  const copyReport = useCallback(async () => {
    if (!reportText) return false;
    try {
      await navigator.clipboard.writeText(reportText);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = reportText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  }, [reportText]);

  return {
    resumeText,
    updateResumeText,
    jobDescription,
    updateJobDescription,
    selectedRole,
    setSelectedRole,
    fileName,
    fileStatus,
    handleFileUpload,
    isLoading,
    loadingStep,
    results,
    aiResults,
    error,
    analyze,
    reset,
    downloadReport,
    copyReport,
  };
}

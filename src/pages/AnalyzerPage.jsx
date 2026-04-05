import React, { useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useResumeAnalyzer } from '../hooks/useResumeAnalyzer';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import FileUpload from '../components/FileUpload';
import JobDescription from '../components/JobDescription';
import LoadingOverlay from '../components/LoadingOverlay';
import ResultsDashboard from '../components/ResultsDashboard';
import EmptyState from '../components/EmptyState';
import Confetti from '../components/Confetti';
import TipsCarousel from '../components/TipsCarousel';
import HistoryPanel from '../components/HistoryPanel';
import { showToast } from '../components/Toast';

export default function AnalyzerPage({ isDark, toggleTheme }) {
  const {
    resumeText, updateResumeText,
    jobDescription, updateJobDescription,
    selectedRole, setSelectedRole,
    fileStatus, handleFileUpload,
    isLoading, loadingStep,
    results, aiResults, error,
    analyze, reset, downloadReport, copyReport,
  } = useResumeAnalyzer();

  const resultsRef = useRef(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleAnalyze = useCallback(async () => {
    await analyze();
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [analyze]);

  const handleDownload = () => {
    downloadReport();
    showToast('Report downloaded!', 'success');
  };

  const handleCopy = async () => {
    const ok = await copyReport();
    if (ok) showToast('Copied to clipboard!', 'success');
    return ok;
  };

  const handleReset = () => {
    reset();
    showToast('All inputs cleared', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleHistory = useCallback((forceClose) => {
    if (forceClose === false) {
      setHistoryOpen(false);
    } else {
      setHistoryOpen((prev) => !prev);
    }
  }, []);

  const handleLoadHistoryEntry = useCallback((entry) => {
    showToast(`Loaded analysis from history (Score: ${entry.score})`, 'success');
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onAnalyze: handleAnalyze,
    onReset: handleReset,
    onToggleTheme: toggleTheme,
    onToggleHistory: handleToggleHistory,
  });

  const showConfetti = results && results.score >= 80;

  return (
    <>
      <main id="main-content" className="max-w-[1400px] mx-auto px-6 py-8 flex-1 relative z-10 w-full" role="main">
        <Confetti active={showConfetti} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col gap-6 h-full">
            <FileUpload
              onFileUpload={handleFileUpload}
              fileStatus={fileStatus}
              resumeText={resumeText}
              onResumeTextChange={updateResumeText}
            />

            {/* Sub Cards */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="border border-surface-800 bg-surface-900/60 rounded-xl p-4 flex items-center gap-4">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-[3px] border-surface-800 border-l-primary-neon border-t-primary-neon transform -rotate-45">
                  <span className="text-white text-xs font-bold transform rotate-45">35%</span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Analysis Progress</h4>
                  <p className="text-surface-500 text-[10px] mt-1 leading-tight">System is initializing semantic mapping and keyword extraction...</p>
                </div>
              </div>
              <div className="border border-surface-800 bg-surface-900/60 rounded-xl p-4 flex items-center gap-4 relative">
                <div className="w-10 h-10 rounded-lg bg-surface-800 flex items-center justify-center text-primary-neon text-lg">
                  ⚡
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Instant Analysis</h4>
                  <p className="text-surface-500 text-[10px] mt-1 leading-tight">Ready for processing</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-primary-neon absolute top-1/2 -translate-y-1/2 right-4 shadow-[0_0_8px_#00F0FF]"></span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col h-full">
            <JobDescription
              jobDescription={jobDescription}
              onJobDescChange={updateJobDescription}
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="mt-8 border border-surface-800 bg-surface-900/40 rounded-2xl p-8 sm:p-12 relative overflow-hidden flex items-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #00F0FF 0%, transparent 40%)' }}></div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="net" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 40 0 0 Z" fill="none" stroke="#fff" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#net)" />
            </svg>
          </div>
          
          <div className="relative z-10 flex-1">
            <p className="text-primary-neon italic text-base mb-2 font-medium">AI Insight</p>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">Curated Career Trajectory</h2>
            <p className="text-surface-300 text-lg sm:text-xl max-w-3xl leading-relaxed mb-8 border-l-2 border-surface-700 pl-4">
              "The most successful candidates don't just list tasks; they quantify their impact using semantic action verbs."
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-surface-800 hover:bg-surface-700 text-surface-200 text-xs font-semibold px-4 py-2 flex items-center rounded-md transition-colors border border-surface-700">Action Verbs</button>
              <button className="bg-surface-800 hover:bg-surface-700 text-surface-200 text-xs font-semibold px-4 py-2 flex items-center rounded-md transition-colors border border-surface-700">Quantifiable Data</button>
              <button className="bg-surface-800 hover:bg-surface-700 text-surface-200 text-xs font-semibold px-4 py-2 flex items-center rounded-md transition-colors border border-surface-700">ATS Compliance</button>
            </div>
          </div>
          <div className="absolute right-0 bottom-[-20%] pointer-events-none select-none text-[250px] font-black text-white/[0.02] leading-none tracking-tighter">AI</div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="mt-12">
          <AnimatePresence mode="wait">
            {isLoading && <LoadingOverlay key="loading" step={loadingStep} />}

            {!isLoading && results && (
              <ResultsDashboard
                key="results"
                results={results}
                aiResults={aiResults}
                resumeText={resumeText}
                onDownload={handleDownload}
                onCopy={handleCopy}
                onReset={handleReset}
              />
            )}

            {!isLoading && !results && <EmptyState key="empty" />}
          </AnimatePresence>
        </div>
      </main>

      {/* History panel */}
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onLoadEntry={handleLoadHistoryEntry}
      />
    </>
  );
}

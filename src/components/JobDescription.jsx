import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JobDescription({ jobDescription, onJobDescChange, onAnalyze, isLoading, error }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-surface-800 bg-surface-900/40 rounded-2xl p-6 sm:p-8 flex-1 h-full flex flex-col"
    >
      <h2 className="text-white text-lg font-bold mb-1">Target Context</h2>
      <p className="text-surface-400 text-sm mb-6">Provide a job description for targeted alignment analysis.</p>

      <div className="flex-1 relative flex flex-col">
        <textarea
          className="w-full flex-1 bg-surface-900/60 border border-surface-800 rounded-xl p-4 text-sm text-white placeholder-surface-600 focus:outline-none focus:border-surface-600 resize-none min-h-[160px] lg:min-h-[240px]"
          placeholder="Paste the Job Description here..."
          value={jobDescription}
          onChange={(e) => onJobDescChange(e.target.value)}
        />
        <div className="absolute bottom-4 right-4 text-primary-neon opacity-70">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="21" y1="10" x2="3" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="21" y1="18" x2="3" y2="18"></line>
          </svg>
        </div>
      </div>

      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="w-full mt-6 bg-transparent border border-surface-700 hover:bg-surface-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-surface-600 border-t-primary-neon rounded-full animate-spin" />
        ) : (
          <span className="text-sm tracking-wider uppercase">Sync with AI Analysis</span>
        )}
      </button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-sm text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-surface-800/50">
        <h3 className="text-[10px] font-bold text-surface-400 tracking-wider uppercase mb-4">Pro Insights</h3>
        
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-accent mt-0.5 shrink-0">
              <path d="M9 18h6"></path>
              <path d="M10 22h4"></path>
              <path d="M12 2v1"></path>
              <path d="M12 7a5 5 0 0 0-5 5c0 2 1.5 3 2 5h6c.5-2 2-3 2-5a5 5 0 0 0-5-5z"></path>
            </svg>
            <p className="text-xs text-surface-300 leading-relaxed">
              Matching JD keywords increases ATS visibility by up to <span className="text-primary-accent font-semibold">85%</span>.
            </p>
          </div>
          
          <div className="flex gap-3 items-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-surface-400 mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="10 8 16 12 10 16 10 8"></polygon>
            </svg>
            <p className="text-xs text-surface-300 leading-relaxed">
              Our Elite Assistant identifies hidden soft skills in your text.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

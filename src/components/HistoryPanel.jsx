import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HISTORY_KEY = 'resume-analyzer-history';
const MAX_HISTORY = 10;

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveToHistory(entry) {
  const history = loadHistory();
  history.unshift({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...entry,
  });
  if (history.length > MAX_HISTORY) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export default function HistoryPanel({ isOpen, onClose, onLoadEntry }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isOpen) setHistory(loadHistory());
  }, [isOpen]);

  const handleClear = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const formatDate = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const scoreColor = (s) => s >= 70 ? 'text-emerald-500' : s >= 40 ? 'text-amber-500' : 'text-red-500';
  const scoreBg = (s) => s >= 70 ? 'bg-emerald-500' : s >= 40 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel - full screen on mobile */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white dark:bg-surface-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-surface-200 dark:border-surface-700">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-surface-800 dark:text-surface-100">Analysis History</h2>
                <p className="text-[10px] sm:text-xs text-surface-500 mt-0.5">{history.length} saved {history.length === 1 ? 'analysis' : 'analyses'}</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {history.length > 0 && (
                  <button onClick={handleClear} className="text-[10px] sm:text-xs text-red-500 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors text-surface-400"
                  aria-label="Close history"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="sm:w-[18px] sm:h-[18px]"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-10 sm:py-12">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <p className="text-xs sm:text-sm text-surface-500">No past analyses yet</p>
                  <p className="text-[10px] sm:text-xs text-surface-400 mt-1">Your analysis history will appear here</p>
                </div>
              ) : (
                history.map((entry, i) => (
                  <motion.button
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { onLoadEntry(entry); onClose(); }}
                    className="w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border border-surface-200 dark:border-surface-700 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all duration-200 group bg-surface-50/50 dark:bg-surface-800/50 active:scale-[0.98]"
                  >
                    <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                      <span className="text-[10px] sm:text-xs text-surface-400">{formatDate(entry.timestamp)}</span>
                      <span className={`text-base sm:text-lg font-black ${scoreColor(entry.score)}`}>{entry.score}</span>
                    </div>

                    {/* Score mini-bar */}
                    <div className="h-1 sm:h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden mb-1.5 sm:mb-2">
                      <div className={`h-full rounded-full ${scoreBg(entry.score)}`} style={{ width: `${entry.score}%` }} />
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-surface-500">
                      <span>{entry.wordCount?.toLocaleString() || '?'} words</span>
                      <span>•</span>
                      <span>{entry.skillCount || '?'} skills</span>
                      {entry.role && <><span>•</span><span className="truncate">{entry.role}</span></>}
                    </div>

                    <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to load this analysis →
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

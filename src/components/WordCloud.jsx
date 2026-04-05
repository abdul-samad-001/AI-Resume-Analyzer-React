import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#0ea5e9'];

export default function WordCloud({ text, jobKeywords = [] }) {
  const words = useMemo(() => {
    if (!text || text.length < 20) return [];
    const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','by','from','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','need','must','i','me','my','we','our','you','your','he','she','it','they','them','this','that','these','those','not','no','so','if','then','than','also','as','just','about','into','through','its','his','her','their','what','which','who','when','where','how','all','each','every','both','few','more','most','other','some','such','up','out','over','very','too','only']);
    const freq = {};
    text.toLowerCase().replace(/[^a-z0-9\s+#./-]/g, ' ').split(/\s+/).forEach((w) => {
      if (w.length > 2 && !stopWords.has(w) && !/^\d+$/.test(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 35)
      .map(([word, count], i) => ({
        word,
        count,
        size: Math.max(11, Math.min(28, 11 + (count - 1) * 4)),
        color: COLORS[i % COLORS.length],
        isMatch: jobKeywords.some((kw) => kw.toLowerCase() === word || word.includes(kw.toLowerCase())),
      }));
  }, [text, jobKeywords]);

  if (words.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-bold text-surface-700 dark:text-surface-200 mb-2 sm:mb-3">Word Cloud</h3>
      <div className="bg-surface-50/50 dark:bg-surface-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 min-h-[100px] sm:min-h-[120px]">
        {words.map((w, i) => (
          <motion.span
            key={w.word}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02, type: 'spring', stiffness: 400, damping: 20 }}
            whileHover={{ scale: 1.25, zIndex: 10 }}
            className={`cursor-default transition-all duration-150 relative group ${w.isMatch ? 'font-bold' : 'font-medium'}`}
            style={{ fontSize: w.size, color: w.isMatch ? '#10b981' : w.color }}
            title={`"${w.word}" appears ${w.count} time${w.count > 1 ? 's' : ''}${w.isMatch ? ' (matches job keywords)' : ''}`}
          >
            {w.word}
            {w.isMatch && (
              <span className="absolute -top-0.5 -right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
            {/* Hover tooltip */}
            <span className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-surface-900 dark:bg-surface-100 text-white dark:text-surface-900 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              ×{w.count}
            </span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}

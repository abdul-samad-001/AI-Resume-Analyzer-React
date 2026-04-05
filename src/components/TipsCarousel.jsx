import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TIPS = [
  { icon: '🎯', title: 'Tailor Every Resume', text: 'Customize your resume for each job application. Use keywords from the job description to boost ATS compatibility.' },
  { icon: '📊', title: 'Quantify Achievements', text: 'Use numbers, percentages, and metrics. "Increased revenue by 35%" is far more impactful than "Improved sales."' },
  { icon: '⚡', title: 'Use Action Verbs', text: 'Start bullet points with strong verbs: Architected, Spearheaded, Streamlined, Orchestrated, Pioneered.' },
  { icon: '📝', title: 'Keep It Concise', text: 'Aim for 1-2 pages. Recruiters spend an average of 7 seconds on an initial resume scan.' },
  { icon: '🔍', title: 'ATS-Friendly Format', text: 'Avoid tables, headers/footers, images, and fancy formatting. Stick to standard section headings.' },
  { icon: '🏆', title: 'Lead with Impact', text: 'Put your most impressive achievements first in each section. Front-load with results, not responsibilities.' },
  { icon: '🔗', title: 'Add Links', text: 'Include LinkedIn, GitHub, or portfolio links. Make sure they are up-to-date and professional.' },
  { icon: '✨', title: 'Proofread Thoroughly', text: 'Typos and grammatical errors are the #1 reason resumes get rejected. Read aloud and use spell-check.' },
];

export default function TipsCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const touchStart = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TIPS.length) % TIPS.length);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TIPS.length);
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStart.current = null;
  };

  const tip = TIPS[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card-solid p-4 sm:p-5 lg:p-6 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-brand-500/5 to-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-2 sm:mb-3 relative">
        <h3 className="text-xs sm:text-sm font-bold text-surface-700 dark:text-surface-200 flex items-center gap-1.5 sm:gap-2">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-[10px] sm:text-xs">💡</span>
          Pro Tip
        </h3>
        <div className="flex items-center gap-1">
          {TIPS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-3 sm:w-4 bg-brand-500'
                  : 'w-1 sm:w-1.5 bg-surface-300 dark:bg-surface-600 hover:bg-surface-400'
              }`}
              aria-label={`Tip ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="flex gap-2.5 sm:gap-3">
            <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{tip.icon}</span>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-surface-800 dark:text-surface-100 mb-0.5 sm:mb-1">{tip.title}</h4>
              <p className="text-[11px] sm:text-xs text-surface-500 dark:text-surface-400 leading-relaxed">{tip.text}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <div className="flex justify-between mt-2 sm:mt-3 relative">
        <button
          onClick={handlePrev}
          className="text-surface-400 hover:text-brand-500 transition-colors p-1 active:scale-90"
          aria-label="Previous tip"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-4 sm:h-4"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[9px] sm:text-[10px] text-surface-400">{index + 1}/{TIPS.length}</span>
        <button
          onClick={handleNext}
          className="text-surface-400 hover:text-brand-500 transition-colors p-1 active:scale-90"
          aria-label="Next tip"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-4 sm:h-4"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </motion.div>
  );
}

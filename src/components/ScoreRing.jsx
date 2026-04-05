import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScoreRing({ score, breakdown }) {
  const [displayScore, setDisplayScore] = useState(0);
  const animFrame = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        animFrame.current = requestAnimationFrame(animate);
      }
    }

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [score]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  const scoreColor = score >= 70 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-red-500';
  const ringColor = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  const glowColor = score >= 70 ? 'rgba(16, 185, 129, 0.15)' : score >= 40 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)';

  const breakdownItems = [
    { label: 'Structure', value: breakdown.structure, max: 25, color: '#3b82f6' },
    { label: 'Keywords', value: breakdown.keywords, max: 25, color: '#6366f1' },
    { label: 'Impact', value: breakdown.impact, max: 25, color: '#10b981' },
    { label: 'Readability', value: breakdown.readability, max: 25, color: '#f59e0b' },
  ];

  return (
    <div className="bg-surface-50/50 dark:bg-surface-900/30 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-10">
      {/* Ring */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
        {/* Glow behind ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              `0 0 20px ${glowColor}`,
              `0 0 40px ${glowColor}`,
              `0 0 20px ${glowColor}`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <svg className="w-full h-full" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r={radius} strokeWidth="10" fill="none" className="stroke-surface-200 dark:stroke-surface-700" />
          <motion.circle
            cx="60" cy="60" r={radius} strokeWidth="10" fill="none"
            stroke={ringColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl sm:text-3xl font-black ${scoreColor}`} aria-label="Resume score">
            {displayScore}
          </span>
          <span className="text-[10px] sm:text-xs text-surface-400">/ 100</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="flex-1 w-full space-y-2.5 sm:space-y-3">
        {breakdownItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 sm:gap-3">
            <span className="w-16 sm:w-24 text-xs sm:text-sm text-surface-500 dark:text-surface-400 flex-shrink-0">
              {item.label}
            </span>
            <div className="flex-1 h-2 sm:h-2.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / item.max) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              />
            </div>
            <span className="w-10 sm:w-12 text-right text-[10px] sm:text-xs font-bold text-surface-600 dark:text-surface-300">
              {item.value}/{item.max}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

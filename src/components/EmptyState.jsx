import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { icon: '📊', label: 'Score Analysis', desc: 'Get an overall resume score' },
  { icon: '🔑', label: 'Keyword Match', desc: 'Compare against job descriptions' },
  { icon: '💡', label: 'Smart Tips', desc: 'AI-powered suggestions' },
  { icon: '📖', label: 'Readability', desc: 'Check clarity and structure' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function EmptyState() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="glass-card-solid p-6 sm:p-10 lg:p-14 text-center overflow-hidden relative"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-brand-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <motion.div variants={itemVariants} className="relative">
        <motion.div
          className="mx-auto mb-4 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 flex items-center justify-center"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="28" height="28" viewBox="0 0 48 48" className="text-brand-500 sm:w-9 sm:h-9" aria-hidden="true">
            <rect x="8" y="4" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <motion.line
              x1="14" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.line
              x1="14" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            />
            <motion.line
              x1="14" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.line
              x1="14" y1="32" x2="22" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.95 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      <motion.h3 variants={itemVariants} className="text-base sm:text-lg font-bold text-surface-700 dark:text-surface-200 mb-1.5 sm:mb-2 relative">
        Ready to analyze your resume
      </motion.h3>
      <motion.p variants={itemVariants} className="text-xs sm:text-sm text-surface-500 dark:text-surface-400 max-w-xs sm:max-w-md mx-auto leading-relaxed mb-6 sm:mb-8 relative">
        Upload your resume above, paste text, and optionally add a job description.
        Click <strong className="text-brand-600 dark:text-brand-400">Analyze Resume</strong> to get instant feedback.
      </motion.p>

      {/* Feature cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-lg mx-auto relative">
        {features.map((f, i) => (
          <motion.div
            key={f.label}
            className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-surface-50 dark:bg-surface-900/40 border border-surface-200/50 dark:border-surface-700/50 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md hover:shadow-brand-500/5 transition-all duration-300 cursor-default group"
            whileHover={{ y: -3, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <span className="text-xl sm:text-2xl block mb-1 sm:mb-1.5 group-hover:scale-110 transition-transform duration-200">{f.icon}</span>
            <span className="text-[10px] sm:text-[11px] font-bold text-surface-700 dark:text-surface-200 block">{f.label}</span>
            <span className="hidden xs:block text-[9px] sm:text-[10px] text-surface-400 dark:text-surface-500">{f.desc}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* File type pills */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 relative">
        {['PDF', 'DOCX', 'TXT'].map((fmt, i) => (
          <motion.span
            key={fmt}
            className="tag-pill text-[10px] sm:text-xs bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 ring-1 ring-surface-200 dark:ring-surface-700 hover:ring-brand-300 dark:hover:ring-brand-700 hover:text-brand-500 dark:hover:text-brand-400 transition-all duration-200 cursor-default"
            whileHover={{ scale: 1.08 }}
          >
            .{fmt.toLowerCase()}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

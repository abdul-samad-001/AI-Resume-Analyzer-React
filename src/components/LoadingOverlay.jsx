import React from 'react';
import { motion } from 'framer-motion';

const pulseColors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

const steps = [
  'Parsing resume content...',
  'Detecting sections and structure...',
  'Analyzing keywords and skills...',
  'Evaluating readability metrics...',
  'Generating improvement suggestions...',
  'Compiling final report...',
];

export default function LoadingOverlay({ step }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card-solid p-6 sm:p-8 lg:p-12 text-center overflow-hidden relative"
    >
      {/* Background pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-purple-500/5"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '30px 30px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="flex flex-col items-center gap-4 sm:gap-6 relative">
        {/* Animated orbital spinner */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-surface-200 dark:border-surface-700"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-brand-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-b-purple-500 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          <div className="absolute inset-4 rounded-full border-[2px] border-transparent border-l-pink-400 animate-spin" style={{ animationDuration: '2s' }} />

          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Loading step text */}
        <div className="h-5 sm:h-6">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs sm:text-sm font-medium text-surface-600 dark:text-surface-300"
          >
            {step}
          </motion.p>
        </div>

        {/* Animated progress dots */}
        <div className="flex gap-1.5 sm:gap-2">
          {pulseColors.map((color, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Skeleton loaders with staggered animation */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-2 sm:space-y-2.5 mt-1 sm:mt-2">
          {[1, 0.8, 0.6, 0.4].map((width, i) => (
            <motion.div
              key={i}
              className="skeleton h-2.5 sm:h-3"
              style={{ width: `${width * 100}%` }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

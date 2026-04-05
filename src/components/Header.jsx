import React from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="w-full bg-[#0b0e17] text-white border-b border-surface-800">
      {/* Top Navigation */}
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-neon">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
          </svg>
          <span className="font-semibold text-sm tracking-wide">The Intelligent Curator</span>
        </div>

        {/* Center Links - Removed as per request */}
        {/* Right Actions - Removed as per request */}
      </div>

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 flex items-start justify-between">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-surface-800/50 rounded-full px-3 py-1 border border-surface-700 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary-neon shadow-[0_0_8px_#00F0FF]"></span>
            <span className="text-[10px] font-bold text-surface-200 tracking-wider">ELITE CAREER ASSISTANT</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold mb-4 tracking-tight"
          >
            AI Resume <span className="text-primary-neon">Analyzer</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-surface-400 text-base leading-relaxed max-w-lg text-balance"
          >
            Optimize your professional narrative with the precision of an elite recruiter. Our AI curator aligns your experience with market demands instantly.
          </motion.p>
        </div>

        {/* Stats on Right */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:flex items-center gap-4 mt-8"
        >
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-surface-800 bg-surface-900/40 w-32">
            <span className="text-xl font-bold text-primary-neon">100%</span>
            <span className="text-[10px] uppercase text-surface-500 font-semibold tracking-wider mt-1">CLIENT-SIDE</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-surface-800 bg-surface-900/40 w-32">
            <span className="text-xl font-bold text-primary-accent">ATS</span>
            <span className="text-[10px] uppercase text-surface-500 font-semibold tracking-wider mt-1">OPTIMIZED</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

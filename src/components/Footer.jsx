import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b0e17] py-8 mt-10 border-t border-surface-800 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        
        {/* Top Text */}
        <h3 className="text-white font-bold text-sm">AI Resume Analyzer</h3>

        {/* Bottom Text */}
        <div className="flex items-center gap-1 text-xs text-surface-500">
          <span>Made with</span>
          <span className="text-red-400 mx-0.5">❤️</span>
          <span>by</span>
          <span className="font-semibold text-surface-300">Abdul Samad</span>
        </div>

      </div>
    </footer>
  );
}

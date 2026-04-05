import React, { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUpload({ onFileUpload, fileStatus, resumeText, onResumeTextChange }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileUpload(file);
  }, [onFileUpload]);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) onFileUpload(file);
    e.target.value = '';
  }, [onFileUpload]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-surface-800 bg-surface-900/40 rounded-2xl p-6 sm:p-8 flex-1"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white text-lg font-bold">Upload Resume</h2>
        <motion.button 
          whileHover={{ y: -2 }}
          onClick={handleClick}
          className="text-primary-accent hover:text-purple-400 transition-colors"
          aria-label="Upload resume"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </motion.button>
      </div>
      <p className="text-surface-400 text-sm mb-6">Drag and drop your PDF or DOCX file here</p>

      {/* Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-300 ${isDragOver ? 'border-primary-neon bg-primary-neon/5' : 'border-surface-700 bg-surface-900/60 hover:border-surface-500'}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-12 h-12 mx-auto bg-surface-800 rounded-lg flex items-center justify-center text-primary-accent mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="12" y2="12"></line>
            <line x1="15" y1="15" x2="12" y2="12"></line>
          </svg>
        </div>
        <p className="font-semibold text-white mb-2">Select a file or drag and drop</p>
        <p className="text-xs text-surface-500">Maximum file size 10MB</p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>

      <AnimatePresence>
        {fileStatus.message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-4 text-sm ${fileStatus.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
          >
            {fileStatus.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 mb-4">
        <h3 className="text-[10px] font-bold text-surface-400 tracking-wider uppercase">Or Paste Experience Details</h3>
      </div>

      <textarea
        className="w-full bg-surface-900/60 border border-surface-800 rounded-xl p-4 text-sm text-white placeholder-surface-600 focus:outline-none focus:border-surface-600 resize-none min-h-[140px]"
        placeholder="Paste your professional summary or work history..."
        value={resumeText}
        onChange={(e) => onResumeTextChange(e.target.value)}
      />
    </motion.section>
  );
}

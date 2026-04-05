import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

let toastId = 0;
const listeners = new Set();

export function showToast(message, type = 'info') {
  const id = ++toastId;
  listeners.forEach((fn) => fn({ id, message, type }));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3500);
  }, []);

  useEffect(() => {
    listeners.add(addToast);
    return () => listeners.delete(addToast);
  }, [addToast]);

  const colors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-red-600 text-white',
    danger: 'bg-red-600 text-white',
    info: 'bg-surface-800 dark:bg-surface-200 text-white dark:text-surface-900',
  };

  const icons = {
    success: '✓',
    error: '✗',
    info: 'ℹ',
    danger: '⚠',
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 left-3 sm:left-auto z-[100] flex flex-col gap-2" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium shadow-xl backdrop-blur-sm flex items-center gap-2 ${colors[t.type] || colors.info}`}
          >
            <span className="text-xs">{icons[t.type] || icons.info}</span>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

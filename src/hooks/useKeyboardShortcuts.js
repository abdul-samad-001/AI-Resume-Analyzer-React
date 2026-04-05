import { useEffect, useCallback } from 'react';

export function useKeyboardShortcuts({ onAnalyze, onReset, onToggleTheme, onToggleHistory }) {
  const handleKeyDown = useCallback((e) => {
    // Ctrl/Cmd + Enter = Analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onAnalyze?.();
    }

    // Ctrl/Cmd + Shift + R = Reset
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
      e.preventDefault();
      onReset?.();
    }

    // Ctrl/Cmd + D = Toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      onToggleTheme?.();
    }

    // Ctrl/Cmd + H = Toggle history
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      onToggleHistory?.();
    }

    // Escape = Close overlays (history)
    if (e.key === 'Escape') {
      onToggleHistory?.(false);
    }
  }, [onAnalyze, onReset, onToggleTheme, onToggleHistory]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

import React, { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { ErrorBoundary } from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';
import AnalyzerPage from './pages/AnalyzerPage';

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  // Enforce dark mode for the new design
  useEffect(() => {
    if (!isDark) toggleTheme();
  }, [isDark, toggleTheme]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#0b0e17] text-white transition-colors duration-300 relative font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-1/2 focus:-translate-x-1/2 focus:z-[200] focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold">
          Skip to main content
        </a>

        <Header />
        <AnalyzerPage />
        <Footer />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

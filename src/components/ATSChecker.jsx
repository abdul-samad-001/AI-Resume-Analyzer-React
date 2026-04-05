import React from 'react';
import { motion } from 'framer-motion';

function checkItem(label, found, detail) {
  return { label, found, detail };
}

export default function ATSChecker({ sections, contactInfo, readability, skills, keywordResult }) {
  const checks = [
    checkItem('Contact Information', contactInfo.hasEmail && contactInfo.hasPhone, contactInfo.hasEmail && contactInfo.hasPhone ? 'Email and phone detected' : 'Missing email or phone number'),
    checkItem('Professional Summary', sections['Summary / Objective'], sections['Summary / Objective'] ? 'Summary section found' : 'Add a professional summary at the top'),
    checkItem('Work Experience', sections['Experience'], sections['Experience'] ? 'Experience section found' : 'Add a work experience section'),
    checkItem('Education Section', sections['Education'], sections['Education'] ? 'Education section found' : 'Add your education background'),
    checkItem('Skills Listed', skills.length >= 5, skills.length >= 5 ? `${skills.length} skills detected` : `Only ${skills.length} skills found — aim for 8+`),
    checkItem('Keyword Alignment', keywordResult.score >= 40, keywordResult.score >= 40 ? `${keywordResult.score}% keyword match` : 'Low keyword match — tailor to job description'),
    checkItem('Optimal Length', readability.wordCount >= 200 && readability.wordCount <= 1200, readability.wordCount >= 200 && readability.wordCount <= 1200 ? `${readability.wordCount} words (good range)` : readability.wordCount < 200 ? 'Too short — add more detail' : 'Too long — consider trimming'),
    checkItem('Readable Format', readability.level !== 'poor', readability.level !== 'poor' ? 'Good readability' : 'Improve sentence structure for clarity'),
  ];

  const passedCount = checks.filter((c) => c.found).length;
  const percentage = Math.round((passedCount / checks.length) * 100);
  const color = percentage >= 75 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-bold text-surface-700 dark:text-surface-200 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-[10px] sm:text-xs">🤖</span>
        ATS Compatibility
      </h3>

      {/* Score bar */}
      <div className="bg-surface-50/50 dark:bg-surface-900/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-2 sm:mb-3">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-xs text-surface-500">ATS Pass Rate</span>
          <span className="text-xs sm:text-sm font-black" style={{ color }}>{percentage}%</span>
        </div>
        <div className="h-2.5 sm:h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-[9px] sm:text-[10px] text-surface-400 mt-1 sm:mt-1.5">
          {passedCount}/{checks.length} checks passed
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-1.5 sm:space-y-2">
        {checks.map((check, i) => (
          <motion.div
            key={check.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all duration-200 cursor-default ${
              check.found
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                : 'bg-red-50/50 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/30'
            }`}
          >
            <motion.span
              className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 rounded-full flex items-center justify-center text-white text-[9px] sm:text-xs font-bold mt-0.5 ${check.found ? 'bg-emerald-500' : 'bg-red-400'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 + 0.2, type: 'spring', stiffness: 500 }}
            >
              {check.found ? '✓' : '!'}
            </motion.span>
            <div className="min-w-0">
              <span className={`font-medium block text-xs sm:text-sm ${check.found ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {check.label}
              </span>
              <span className="text-[10px] sm:text-xs text-surface-500 dark:text-surface-400">{check.detail}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

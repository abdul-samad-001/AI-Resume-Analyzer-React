import React from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

export default function StrengthRadar({ breakdown, sections, readability, contactInfo, achievements, actionVerbs }) {
  const sectionCount = Object.values(sections).filter(Boolean).length;
  const totalSections = Object.keys(sections).length;

  const data = [
    { category: 'Structure', value: Math.round((breakdown.structure / 25) * 100), fullMark: 100 },
    { category: 'Keywords', value: Math.round((breakdown.keywords / 25) * 100), fullMark: 100 },
    { category: 'Impact', value: Math.round((breakdown.impact / 25) * 100), fullMark: 100 },
    { category: 'Readability', value: Math.round((breakdown.readability / 25) * 100), fullMark: 100 },
    { category: 'Sections', value: Math.round((sectionCount / totalSections) * 100), fullMark: 100 },
    { category: 'Contact', value: contactInfo.hasEmail && contactInfo.hasPhone ? 100 : contactInfo.hasEmail || contactInfo.hasPhone ? 50 : 0, fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.[0]) return null;
    const { category, value } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-surface-800 shadow-xl rounded-xl px-3 py-2 border border-surface-200 dark:border-surface-700">
        <p className="text-xs font-bold text-surface-800 dark:text-surface-100">{category}</p>
        <p className="text-xs text-surface-500">{value}% strength</p>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-xs sm:text-sm font-bold text-surface-700 dark:text-surface-200 mb-2 sm:mb-3">Strength Radar</h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-surface-50/50 dark:bg-surface-900/30 rounded-2xl p-2 sm:p-4"
      >
        <ResponsiveContainer width="100%" height={220} className="sm:!h-[260px]">
          <RadarChart data={data}>
            <PolarGrid stroke="#64748b30" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              className="sm:text-[11px]"
            />
            <Radar
              name="Strength"
              dataKey="value"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.2}
              strokeWidth={2}
              animationDuration={1200}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

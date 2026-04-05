import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CATEGORY_MAP = {
  Languages: ['javascript','typescript','python','java','c++','c#','ruby','go','rust','php','swift','kotlin','scala','r','matlab','perl'],
  Frontend: ['html','css','sass','less','react','angular','vue','svelte','next.js','nuxt'],
  Backend: ['node.js','express','django','flask','spring','rails','laravel','.net','asp.net','graphql','rest','api','grpc','websocket'],
  'Cloud/DevOps': ['aws','azure','gcp','docker','kubernetes','terraform','ansible','jenkins','ci/cd','devops','linux','bash','powershell','nginx','apache'],
  Databases: ['sql','mysql','postgresql','mongodb','redis','elasticsearch','dynamodb','firebase'],
  'AI/ML': ['tensorflow','pytorch','scikit-learn','pandas','numpy','keras','machine learning','deep learning','nlp','computer vision','data science'],
  Design: ['figma','sketch','adobe xd','photoshop','illustrator'],
  Tools: ['git','github','gitlab','bitbucket','jira','confluence','tableau','power bi','excel','google analytics'],
  Methodologies: ['agile','scrum','kanban','waterfall'],
};

const COLORS = ['#6366f1','#8b5cf6','#a855f7','#ec4899','#f43f5e','#f97316','#eab308','#22c55e','#14b8a6','#0ea5e9'];

export default function SkillChart({ skills }) {
  const chartData = useMemo(() => {
    const counts = {};
    skills.forEach((skill) => {
      let found = false;
      for (const [cat, list] of Object.entries(CATEGORY_MAP)) {
        if (list.includes(skill.toLowerCase())) { counts[cat] = (counts[cat] || 0) + 1; found = true; break; }
      }
      if (!found) counts['Other'] = (counts['Other'] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [skills]);

  if (!chartData.length) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
      <div className="w-36 h-36 sm:w-48 sm:h-48 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={28} outerRadius={55} paddingAngle={3} dataKey="value" animationDuration={1000} className="sm:[&>path]:!innerRadius-[35px] sm:[&>path]:!outerRadius-[70px]">
              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip content={({ active, payload }) => active && payload?.[0] ? (
              <div className="bg-white dark:bg-surface-800 shadow-lg rounded-xl px-3 py-2 border border-surface-200 dark:border-surface-700">
                <p className="text-xs font-semibold text-surface-800 dark:text-surface-100">{payload[0].name}: {payload[0].value}</p>
              </div>
            ) : null} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 sm:gap-2">
        {chartData.map((item, i) => (
          <div key={item.name} className="flex items-center gap-1.5 text-[10px] sm:text-xs">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-surface-600 dark:text-surface-300">{item.name} <b>({item.value})</b></span>
          </div>
        ))}
      </div>
    </div>
  );
}

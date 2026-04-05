// ── Role-Based Keyword Databases ──
export const ROLE_KEYWORDS = {
  'software-engineer': {
    required: ['javascript', 'python', 'java', 'git', 'api', 'algorithms', 'data structures', 'testing', 'debugging', 'agile'],
    preferred: ['react', 'node', 'typescript', 'aws', 'docker', 'kubernetes', 'ci/cd', 'microservices', 'rest', 'graphql', 'sql', 'nosql', 'redis', 'linux', 'performance'],
    action_verbs: ['developed', 'built', 'designed', 'implemented', 'optimized', 'architected', 'deployed', 'integrated', 'refactored', 'automated'],
  },
  'data-scientist': {
    required: ['python', 'machine learning', 'statistics', 'sql', 'data analysis', 'visualization', 'modeling', 'pandas', 'numpy', 'scikit-learn'],
    preferred: ['tensorflow', 'pytorch', 'deep learning', 'nlp', 'r', 'spark', 'tableau', 'a/b testing', 'feature engineering', 'big data', 'aws', 'gcp', 'jupyter'],
    action_verbs: ['analyzed', 'modeled', 'predicted', 'visualized', 'optimized', 'discovered', 'automated', 'researched', 'improved', 'reduced'],
  },
  'product-manager': {
    required: ['roadmap', 'stakeholders', 'prioritization', 'user research', 'agile', 'metrics', 'strategy', 'requirements', 'cross-functional', 'data-driven'],
    preferred: ['okrs', 'a/b testing', 'jira', 'scrum', 'kanban', 'persona', 'mvp', 'analytics', 'market research', 'competitive analysis', 'sprint planning', 'user stories'],
    action_verbs: ['launched', 'drove', 'defined', 'prioritized', 'led', 'managed', 'delivered', 'coordinated', 'aligned', 'increased'],
  },
  'ux-designer': {
    required: ['user research', 'wireframing', 'prototyping', 'usability testing', 'figma', 'design thinking', 'user flows', 'accessibility', 'interaction design', 'visual design'],
    preferred: ['sketch', 'adobe xd', 'invision', 'responsive design', 'design systems', 'information architecture', 'heuristic evaluation', 'persona', 'journey mapping', 'a/b testing'],
    action_verbs: ['designed', 'researched', 'prototyped', 'tested', 'iterated', 'created', 'improved', 'conducted', 'collaborated', 'simplified'],
  },
  'marketing-manager': {
    required: ['marketing strategy', 'campaigns', 'analytics', 'seo', 'content marketing', 'social media', 'brand', 'roi', 'email marketing', 'lead generation'],
    preferred: ['google analytics', 'hubspot', 'crm', 'ppc', 'conversion rate', 'copywriting', 'market research', 'segmentation', 'funnel', 'retention'],
    action_verbs: ['launched', 'increased', 'grew', 'managed', 'optimized', 'created', 'drove', 'achieved', 'scaled', 'generated'],
  },
  'project-manager': {
    required: ['project planning', 'stakeholders', 'risk management', 'budget', 'scheduling', 'agile', 'waterfall', 'scope', 'deliverables', 'cross-functional'],
    preferred: ['pmp', 'scrum', 'gantt', 'jira', 'confluence', 'resource allocation', 'change management', 'sprint', 'milestone', 'procurement'],
    action_verbs: ['managed', 'delivered', 'coordinated', 'planned', 'led', 'tracked', 'mitigated', 'facilitated', 'executed', 'reported'],
  },
  'devops-engineer': {
    required: ['ci/cd', 'docker', 'kubernetes', 'aws', 'linux', 'automation', 'infrastructure', 'monitoring', 'terraform', 'scripting'],
    preferred: ['ansible', 'jenkins', 'github actions', 'gcp', 'azure', 'prometheus', 'grafana', 'helm', 'microservices', 'security', 'networking', 'load balancing'],
    action_verbs: ['automated', 'deployed', 'configured', 'monitored', 'optimized', 'managed', 'built', 'maintained', 'scaled', 'reduced'],
  },
  'business-analyst': {
    required: ['requirements', 'stakeholders', 'data analysis', 'process improvement', 'documentation', 'sql', 'business process', 'user stories', 'gap analysis', 'reporting'],
    preferred: ['tableau', 'power bi', 'jira', 'confluence', 'agile', 'uml', 'bpmn', 'excel', 'erd', 'use cases', 'kpi', 'dashboard'],
    action_verbs: ['analyzed', 'documented', 'identified', 'recommended', 'facilitated', 'gathered', 'improved', 'streamlined', 'mapped', 'validated'],
  },
};

export const ROLES = [
  { value: '', label: '— None —' },
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'ux-designer', label: 'UX Designer' },
  { value: 'marketing-manager', label: 'Marketing Manager' },
  { value: 'project-manager', label: 'Project Manager' },
  { value: 'devops-engineer', label: 'DevOps Engineer' },
  { value: 'business-analyst', label: 'Business Analyst' },
];

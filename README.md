# AI Resume Analyzer

A production-ready, AI-powered resume analyzer built with React, Vite, and Tailwind CSS. Upload your resume and get instant, actionable feedback on structure, keywords, readability, and more — all running 100% in your browser.

![AI Resume Analyzer](screenshots/light-mode.png)

## ✨ Features

### Resume Upload & Parsing
- **Drag & drop** file upload accepting PDF, DOCX, DOC, TXT, and Markdown
- **Text paste** as an alternative input method  
- Client-side file parsing via **pdfjs-dist** and **mammoth.js**
- File validation with size limits and user feedback

### Heuristic Analysis (No API Required)
- **Section Detection** — Identifies Summary, Experience, Education, Skills, Projects, etc.
- **Score Dashboard** — Overall score (0–100) with animated ring and category breakdown
- **Keyword Matching** — Compare resume keywords against job descriptions or role templates
- **Readability Analysis** — Flesch Reading Ease, Grade Level, sentence metrics
- **Action Verb Detection** — Flags strong vs. weak language
- **Quantified Achievements** — Finds metrics, percentages, and impact numbers
- **Improvement Suggestions** — Prioritized, actionable recommendations

### AI-Powered Analysis (Optional)
- **Google Gemini** or **OpenAI GPT** integration for deeper insights
- Extracts structured resume data (name, experience, education, skills)
- AI-generated strengths, weaknesses, and improvement areas
- Job description match scoring and missing skills analysis
- Graceful fallback — works fully offline with heuristic analysis

### Results Dashboard
- **Tabbed interface** — Overview, Keywords, Suggestions, Readability, AI Insights
- **Skill Distribution Chart** — Recharts donut chart showing skill categories
- **Animated score ring** with color-coded breakdown bars
- **Report export** — Download as `.txt` or copy to clipboard

### UI/UX
- **Dark mode** with system preference detection and toggle
- **Glassmorphism** card design with smooth transitions
- **Framer Motion** animations throughout
- **Mobile-first** responsive design
- **Accessibility** — Skip links, ARIA labels, keyboard navigation
- **Toast notifications** for user feedback
- **Confetti celebration** when you score 80+!

## 🛠️ Tech Stack

| Technology    | Purpose                    |
|---------------|----------------------------|
| React 18      | UI framework               |
| Vite          | Build tool & dev server    |
| Tailwind CSS  | Utility-first styling      |
| Framer Motion | Animations & transitions   |
| pdfjs-dist    | PDF text extraction        |
| Mammoth.js    | DOCX text extraction       |
| Recharts      | Skill distribution chart   |
| Gemini/OpenAI | AI-powered analysis (opt.) |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Confetti.jsx     # Celebration animation
│   ├── EmptyState.jsx   # Pre-analysis placeholder
│   ├── ErrorBoundary.jsx# React error boundary
│   ├── FileUpload.jsx   # Drag & drop upload
│   ├── Footer.jsx       # App footer
│   ├── Header.jsx       # Gradient header with theme toggle
│   ├── JobDescription.jsx # Job desc input + role selector
│   ├── LoadingOverlay.jsx # Spinner + skeleton loaders
│   ├── ResultsDashboard.jsx # Tabbed results view
│   ├── ScoreRing.jsx    # Animated score circle
│   ├── SkillChart.jsx   # Recharts donut chart
│   └── Toast.jsx        # Global toast notification system
├── hooks/               # Custom React hooks
│   ├── useResumeAnalyzer.js # Core analysis orchestration
│   └── useTheme.js      # Dark/light mode management
├── pages/               # Page-level components
│   └── AnalyzerPage.jsx # Main application page
├── services/            # External integrations
│   ├── aiService.js     # Gemini/OpenAI API calls
│   └── fileParser.js    # PDF/DOCX/TXT parsing
├── styles/              # Global styles
│   └── index.css        # Tailwind directives + custom components
├── utils/               # Helper functions
│   ├── analysis.js      # NLP analysis engine
│   └── constants.js     # Role keywords & config
├── App.jsx              # Root component
└── main.jsx             # React entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd AI-Resume_Analyzer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will open at `http://localhost:5173/`.

### AI Analysis (Optional)

To enable AI-powered insights, create a `.env` file:

```bash
cp .env.example .env
```

Add your API key:

```
# Google Gemini (recommended)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# OR OpenAI
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

### Production Build

```bash
npm run build
npm run preview
```

## 🔒 Privacy

All analysis runs entirely in your browser. No resume data is ever transmitted to external servers. The only external calls made are:
- Google Fonts (Inter) — loaded once
- AI API (optional) — only when you provide an API key

## 📄 License

MIT

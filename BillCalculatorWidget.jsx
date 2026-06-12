@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
@import './styles/theme.css';
:root {
  /* Colors */
  --color-primary: #1A3C6E;
  --color-primary-light: #2A5A9E;
  --color-primary-dark: #10264A;
  
  --color-accent: #F47920;
  --color-accent-light: #F6964E;
  --color-accent-dark: #D4600C;

  --color-bg-light: #F3F4F6; /* Slightly darker grey to make dark cards pop */
  --color-surface-light: #FFFFFF;
  --color-text-light: #111827;
  --color-text-muted-light: #6B7280;
  --color-border-light: #E5E7EB;

  /* Status Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --color-info: #3B82F6;

  /* Typography */
  --font-family: 'Poppins', 'Inter', sans-serif;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Layout */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;

  /* Current Theme defaults (Light mode) */
  --color-bg: var(--color-bg-light);
  --color-surface: var(--color-surface-light);
  --color-text: var(--color-text-light);
  --color-text-muted: var(--color-text-muted-light);
  --color-border: var(--color-border-light);
}

[data-theme='dark'] {
  --color-bg: #111827;
  --color-surface: #1F2937;
  --color-text: #F9FAFB;
  --color-text-muted: #9CA3AF;
  --color-border: #374151;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
  transition: background-color 0.3s ease, color 0.3s ease;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  font-family: var(--font-family);
  cursor: pointer;
  border: none;
  background: none;
}

/* Utilities */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-6);
  border: 1px solid var(--color-border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-light);
  color: white;
  text-decoration: none;
}

.btn-accent {
  background-color: var(--color-accent);
  color: white;
}

.btn-accent:hover {
  background-color: var(--color-accent-light);
  color: white;
  text-decoration: none;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.btn-outline:hover {
  background-color: var(--color-border);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-success { background-color: rgba(16, 185, 129, 0.1); color: var(--color-success); }
.badge-warning { background-color: rgba(245, 158, 11, 0.1); color: var(--color-warning); }
.badge-danger { background-color: rgba(239, 68, 68, 0.1); color: var(--color-danger); }
.badge-info { background-color: rgba(59, 130, 246, 0.1); color: var(--color-info); }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-2 { gap: var(--spacing-2); }
.gap-4 { gap: var(--spacing-4); }
.gap-6 { gap: var(--spacing-6); }

.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

.text-primary { color: var(--color-primary); }
.text-accent { color: var(--color-accent); }
.text-muted { color: var(--color-text-muted); }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }

.mt-2 { margin-top: var(--spacing-2); }
.mt-4 { margin-top: var(--spacing-4); }
.mb-2 { margin-bottom: var(--spacing-2); }
.mb-4 { margin-bottom: var(--spacing-4); }
.mb-8 { margin-bottom: var(--spacing-8); }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }

/* Form Elements */
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-4);
}

.input-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-text);
}

.input-field {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: 1rem;
  background-color: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(26, 60, 110, 0.2);
}

/* Specific elements */
.meter-digit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 44px;
  background-color: #222;
  color: white;
  font-size: 1.25rem;
  font-family: 'Courier New', Courier, monospace;
  border: 1px solid #444;
  border-radius: 4px;
  margin: 0 2px;
  overflow: hidden;
  position: relative;
  font-weight: bold;
}

/* Demo Card Styles */
.demo-card-link {
  text-decoration: none !important;
  color: inherit !important;
  display: block;
}

.demo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 285px;
  background: linear-gradient(180deg, #1e293b 0%, #0b0f19 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  padding: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.demo-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.04), transparent 60%);
  pointer-events: none;
}

.demo-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.05);
}

.demo-card-badges {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-card-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.demo-card-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.demo-card-badge-dot.bg-green-500 {
  background-color: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.demo-card-badge-dot.bg-blue-500 {
  background-color: #3b82f6;
  box-shadow: 0 0 8px #3b82f6;
}

.demo-card-badge-dot.bg-purple-500 {
  background-color: #a855f7;
  box-shadow: 0 0 8px #a855f7;
}

.demo-card-badge-dot.bg-orange-500 {
  background-color: #f97316;
  box-shadow: 0 0 8px #f97316;
}

.demo-card-badge-dot.bg-red-500 {
  background-color: #ef4444;
  box-shadow: 0 0 8px #ef4444;
}

.demo-card-icon-container {
  width: 68px;
  height: 68px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.demo-card:hover .demo-card-icon-container {
  transform: scale(1.1) rotate(3deg);
}

.demo-card-icon {
  color: white;
}

/* Gradients for Icon Container */
.bg-gradient-to-br {
  background-size: 200% 200%;
}

.bg-gradient-to-br.from-blue-500.to-indigo-600 {
  background-image: linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%);
}

.bg-gradient-to-br.from-green-500.to-emerald-600 {
  background-image: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.bg-gradient-to-br.from-orange-500.to-amber-600 {
  background-image: linear-gradient(135deg, #f97316 0%, #d97706 100%);
}

.bg-gradient-to-br.from-purple-500.to-violet-600 {
  background-image: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
}

.bg-gradient-to-br.from-pink-500.to-rose-600 {
  background-image: linear-gradient(135deg, #ec4899 0%, #e11d48 100%);
}

.bg-gradient-to-br.from-yellow-500.to-orange-500 {
  background-image: linear-gradient(135deg, #eab308 0%, #f97316 100%);
}

.bg-gradient-to-br.from-cyan-500.to-blue-600 {
  background-image: linear-gradient(135deg, #06b6d4 0%, #2563eb 100%);
}

.bg-gradient-to-br.from-red-500.to-rose-700 {
  background-image: linear-gradient(135deg, #ef4444 0%, #be123c 100%);
}

.demo-card-body {
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.demo-card-subtitle {
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.375rem;
}

.demo-card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.demo-card-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1rem;
  margin-top: auto;
}

.demo-card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.demo-card-feature-item {
  display: flex;
  align-items: center;
}

.demo-card-feature-sep {
  margin-left: 0.35rem;
  color: rgba(255, 255, 255, 0.18);
}

.demo-card-arrow-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.demo-card:hover .demo-card-arrow-circle {
  background-color: white;
  color: #0b0f19;
  transform: scale(1.1);
}

.demo-card-arrow {
  transition: transform 0.2s ease;
}

.demo-card:hover .demo-card-arrow {
  transform: translate(1px, -1px);
}

/* Custom Grid Adjustments */
.demo-card-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .demo-card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .demo-card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .demo-card-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* RESPONSIVE VISIBILITY PATTY */
.hidden {
  display: none !important;
}

@media (min-width: 768px) {
  .md\:hidden {
    display: none !important;
  }
  .md\:flex {
    display: flex !important;
  }
  .md\:grid {
    display: grid !important;
  }
  .md\:block {
    display: block !important;
  }
}

/* POSITIONING & LAYOUT */
.relative { position: relative !important; }
.absolute { position: absolute !important; }
.right-0 { right: 0 !important; }
.top-0 { top: 0 !important; }
.w-full { width: 100% !important; }
.h-full { height: 100% !important; }
.w-32 { width: 8rem !important; }
.h-32 { height: 8rem !important; }
.h-2 { height: 0.5rem !important; }
.h-64 { height: 16rem !important; }
.rounded-full { border-radius: 9999px !important; }
.rounded-md { border-radius: var(--radius-md) !important; }
.rounded-lg { border-radius: var(--radius-lg) !important; }
.overflow-hidden { overflow: hidden !important; }
.pointer-events-none { pointer-events: none !important; }
.opacity-0 { opacity: 0 !important; }
.cursor-pointer { cursor: pointer !important; }
.cursor-text { cursor: text !important; }

/* SPACING UTILITIES */
.p-2 { padding: var(--spacing-2) !important; }
.p-3 { padding: var(--spacing-3) !important; }
.p-4 { padding: var(--spacing-4) !important; }
.p-6 { padding: var(--spacing-6) !important; }
.pb-2 { padding-bottom: var(--spacing-2) !important; }
.pb-3 { padding-bottom: var(--spacing-3) !important; }
.py-2 { padding-top: var(--spacing-2) !important; padding-bottom: var(--spacing-2) !important; }
.py-6 { padding-top: var(--spacing-6) !important; padding-bottom: var(--spacing-6) !important; }
.px-2 { padding-left: var(--spacing-2) !important; padding-right: var(--spacing-2) !important; }
.px-4 { padding-left: var(--spacing-4) !important; padding-right: var(--spacing-4) !important; }

.mt-2 { margin-top: var(--spacing-2) !important; }
.mt-4 { margin-top: var(--spacing-4) !important; }
.mt-8 { margin-top: var(--spacing-8) !important; }
.mb-1 { margin-bottom: var(--spacing-1) !important; }
.mb-2 { margin-bottom: var(--spacing-2) !important; }
.mb-3 { margin-bottom: var(--spacing-3) !important; }
.mb-4 { margin-bottom: var(--spacing-4) !important; }
.mb-6 { margin-bottom: var(--spacing-6) !important; }
.mb-8 { margin-bottom: var(--spacing-8) !important; }
.my-2 { margin-top: var(--spacing-2) !important; margin-bottom: var(--spacing-2) !important; }

.gap-1 { gap: var(--spacing-1) !important; }
.gap-2 { gap: var(--spacing-2) !important; }
.gap-3 { gap: var(--spacing-3) !important; }
.gap-4 { gap: var(--spacing-4) !important; }
.gap-6 { gap: var(--spacing-6) !important; }
.gap-10 { gap: 2.5rem !important; }

/* FLEXBOX & GRID ALIGNMENT */
.flex-1 { flex: 1 1 0% !important; }
.flex-wrap { flex-wrap: wrap !important; }
.items-start { align-items: flex-start !important; }
.items-end { align-items: flex-end !important; }
.justify-center { justify-content: center !important; }
.justify-between { justify-content: space-between !important; }

/* GRID LAYOUTS */
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }

@media (min-width: 1024px) {
  .lg\:col-span-2 {
    grid-column: span 2 / span 2 !important;
  }
}

/* TYPOGRAPHY HELPERS */
.text-xs { font-size: 0.75rem !important; }
.text-sm { font-size: 0.875rem !important; }
.text-lg { font-size: 1.125rem !important; }
.text-xl { font-size: 1.25rem !important; }
.text-2xl { font-size: 1.5rem !important; }
.text-3xl { font-size: 1.875rem !important; }
.text-4xl { font-size: 2.25rem !important; }
.text-5xl { font-size: 3rem !important; }

.font-normal { font-weight: 400 !important; }
.font-medium { font-weight: 500 !important; }
.font-semibold { font-weight: 600 !important; }
.font-bold { font-weight: 700 !important; }
.font-extrabold { font-weight: 800 !important; }

.tracking-tight { letter-spacing: -0.025em !important; }
.tracking-wider { letter-spacing: 0.05em !important; }
.uppercase { text-transform: uppercase !important; }

/* BORDERS */
.border-t { border-top: 1px solid var(--color-border) !important; }
.border-dashed { border-style: dashed !important; }
.border-2 { border-width: 2px !important; }
.border-transparent { border-color: transparent !important; }
.border-t-4 { border-top-width: 4px !important; }

/* COLORS & BACKGROUNDS */
.text-gray-900 { color: #111827 !important; }
.text-gray-300 { color: #d1d5db !important; }
.text-green-500 { color: #10b981 !important; }
.text-red-500 { color: #ef4444 !important; }
.text-purple-500 { color: #a855f7 !important; }
.text-white { color: #ffffff !important; }
.text-green-600 { color: #16a34a !important; }
.text-red-600 { color: #dc2626 !important; }

.bg-purple-100 { background-color: #f3e8ff !important; }
.text-purple-700 { color: #7e22ce !important; }

.bg-orange-50 { background-color: #fff7ed !important; }
.border-orange-200 { border-color: #fed7aa !important; }

.bg-red-50 { background-color: #fef2f2 !important; }
.border-red-200 { border-color: #fecaca !important; }
.bg-red-600 { background-color: #dc2626 !important; }
.bg-red-600:hover { background-color: #b91c1c !important; }
.text-center { text-align: center !important; }
.text-right { text-align: right !important; }

/* DARK MODE PATCHES */
[data-theme='dark'] .text-gray-900 { color: #f9fafb !important; }
[data-theme='dark'] .bg-gray-200 { background-color: #374151 !important; }
[data-theme='dark'] .dark\:text-white { color: #ffffff !important; }
[data-theme='dark'] .dark\:text-gray-300 { color: #d1d5db !important; }
[data-theme='dark'] .dark\:bg-purple-900\/30 { background-color: rgba(107, 33, 168, 0.3) !important; }
[data-theme='dark'] .dark\:text-purple-300 { color: #d8b4fe !important; }
[data-theme='dark'] .dark\:bg-purple-950\/20 { background-color: rgba(88, 28, 135, 0.2) !important; }
[data-theme='dark'] .dark\:border-purple-900\/30 { border-color: rgba(126, 34, 206, 0.3) !important; }
[data-theme='dark'] .dark\:bg-green-950\/20 { background-color: rgba(20, 83, 45, 0.2) !important; }
[data-theme='dark'] .dark\:text-green-400 { color: #4ade80 !important; }
[data-theme='dark'] .dark\:bg-red-950\/20 { background-color: rgba(127, 29, 29, 0.2) !important; }
[data-theme='dark'] .dark\:text-red-400 { color: #f87171 !important; }

[data-theme='dark'] .bg-orange-50 { background-color: rgba(249, 115, 22, 0.1) !important; }
[data-theme='dark'] .border-orange-200 { border-color: rgba(249, 115, 22, 0.2) !important; }
[data-theme='dark'] .bg-red-50 { background-color: rgba(239, 68, 68, 0.1) !important; }
[data-theme='dark'] .border-red-200 { border-color: rgba(239, 68, 68, 0.2) !important; }

/* Brand Flame Logos */
.brand-logo-flame-small {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(234, 88, 12, 0.2);
}

.brand-logo-center {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(234, 88, 12, 0.35);
}

/* Nav Link Pill Styling */
.nav-link-active {
  background-color: #f3f4f6 !important;
  color: #111827 !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  padding: 0.5rem 1rem !important;
  border-radius: 9999px !important;
  text-decoration: none !important;
}

[data-theme='dark'] .nav-link-active {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
}

.nav-link-inactive {
  color: #4b5563 !important;
  font-weight: 500 !important;
  font-size: 0.875rem !important;
  padding: 0.5rem 1rem !important;
  border-radius: 9999px !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
}

[data-theme='dark'] .nav-link-inactive {
  color: #9ca3af !important;
}

.nav-link-inactive:hover {
  color: #111827 !important;
  background-color: rgba(243, 244, 246, 0.5) !important;
}

[data-theme='dark'] .nav-link-inactive:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.04) !important;
}

/* Dark Connection Button */
.btn-new-connection {
  background-color: #0b0f19 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  padding: 0.625rem 1.25rem !important;
  border-radius: 8px !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 4px 12px rgba(11, 15, 25, 0.15) !important;
}

.btn-new-connection:hover {
  background-color: #1e293b !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 16px rgba(11, 15, 25, 0.25) !important;
}

/* Mockup Layout - Selection Cards */
.portal-selection-card {
  background-color: var(--color-surface) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: 24px !important;
  padding: 2.25rem 2rem !important;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: default;
}

.portal-selection-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
}

[data-theme='dark'] .portal-selection-card {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
}

[data-theme='dark'] .portal-selection-card:hover {
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.3) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

/* Icon Gradient Styles */
.portal-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
}

.bg-gradient-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
}

.bg-gradient-orange {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
}

/* Bullet List style */
.portal-bullet-list {
  list-style-type: none !important;
  padding-left: 0 !important;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.portal-bullet-list li {
  font-size: 0.85rem !important;
  color: var(--color-text) !important;
  padding-left: 1.25rem !important;
  position: relative !important;
  font-weight: 500 !important;
}

.portal-bullet-list li::before {
  content: "•" !important;
  position: absolute !important;
  left: 0.125rem !important;
  color: var(--color-text-muted) !important;
  font-size: 1.15rem !important;
  line-height: 1 !important;
  top: -1px !important;
}

/* Card Action Link style */
.portal-action-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  font-size: 0.95rem !important;
  font-weight: 700 !important;
  color: #1d4ed8 !important;
  text-decoration: none !important;
  transition: gap 0.2s ease !important;
  margin-top: auto;
  align-self: flex-start;
}

[data-theme='dark'] .portal-action-link {
  color: #60a5fa !important;
}

.portal-action-link:hover {
  text-decoration: underline !important;
  gap: 0.75rem !important;
}

/* Bottom Support Cards */
.support-info-card {
  background-color: var(--color-surface) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: 12px !important;
  padding: 1.5rem !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.005) !important;
  transition: all 0.2s ease !important;
}

.support-info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.03) !important;
}

[data-theme='dark'] .support-info-card {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
}

/* Helper Font sizes */
.text-xxs {
  font-size: 0.65rem !important;
}

/* ========== DASHBOARD CARD REDESIGN ========== */
.dash-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.2s ease;
}

.dash-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.dash-card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.dash-card-header-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.dash-card-header-icon.blue { background: linear-gradient(135deg, #1a3c6e, #2a5a9e); }
.dash-card-header-icon.orange { background: linear-gradient(135deg, #f97316, #ea580c); }
.dash-card-header-icon.green { background: linear-gradient(135deg, #10b981, #059669); }
.dash-card-header-icon.purple { background: linear-gradient(135deg, #a855f7, #7c3aed); }
.dash-card-header-icon.red { background: linear-gradient(135deg, #ef4444, #dc2626); }
.dash-card-header-icon.navy { background: linear-gradient(135deg, #1e293b, #0f172a); }

.dash-card-header-title {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text);
}

/* Slab progress bars */
.slab-bar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
}

.slab-bar-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-text-muted);
  width: 45px;
  flex-shrink: 0;
  text-transform: uppercase;
}

.slab-bar-track {
  flex: 1;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

[data-theme='dark'] .slab-bar-track {
  background-color: #374151;
}

.slab-bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.6s ease;
}

.slab-bar-fill.green { background: linear-gradient(90deg, #10b981, #34d399); }
.slab-bar-fill.orange { background: linear-gradient(90deg, #f97316, #fb923c); }
.slab-bar-fill.red { background: linear-gradient(90deg, #ef4444, #f87171); }

.slab-bar-amount {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
  width: 65px;
  text-align: right;
  flex-shrink: 0;
}

/* Due date banner */
.due-date-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 12px;
  padding: 0.625rem 1rem;
  margin-top: 1rem;
}

[data-theme='dark'] .due-date-banner {
  background-color: rgba(251, 191, 36, 0.08);
  border-color: rgba(251, 191, 36, 0.2);
}

.due-date-banner-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #92400e;
}

[data-theme='dark'] .due-date-banner-text {
  color: #fbbf24;
}

.btn-pay-now {
  background-color: #1e293b;
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
  text-decoration: none;
  border: none;
  cursor: pointer;
}

.btn-pay-now:hover {
  background-color: #0f172a;
  transform: translateY(-1px);
}

/* Active Slab Badge */
.slab-active-badge {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  background-color: #dcfce7;
  color: #166534;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

[data-theme='dark'] .slab-active-badge {
  background-color: rgba(22, 163, 74, 0.15);
  color: #4ade80;
}

/* Chart legend */
.chart-legend {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}

.chart-legend-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.chart-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* Meter digit boxes */
.meter-display-container {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
}

.meter-display-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.meter-display-digits {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.meter-box {
  width: 40px;
  height: 52px;
  background-color: #10b981;
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-family: 'Poppins', monospace;
}

.meter-box.decimal {
  background-color: #f97316;
}

.meter-dot {
  color: white;
  font-size: 1.75rem;
  font-weight: 900;
  margin: 0 -2px;
}

.meter-display-unit {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 1rem;
}

/* Connection info rows */
.conn-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
}

.conn-info-row:last-child {
  border-bottom: none;
}

.conn-info-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.conn-info-value {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: right;
}

/* Smart Alert Cards */
.smart-alert-emergency {
  background-color: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

[data-theme='dark'] .smart-alert-emergency {
  background-color: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.25);
}

.smart-alert-emergency-phone {
  background: linear-gradient(90deg, #dc2626, #b91c1c);
  color: white;
  text-align: center;
  padding: 0.625rem;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.smart-alert-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 1.25rem;
  margin-bottom: 0.75rem;
  position: relative;
  transition: border-color 0.2s ease;
}

.smart-alert-item:hover {
  border-color: var(--color-primary);
}

.smart-alert-item.border-orange { border-left: 4px solid #f97316; }
.smart-alert-item.border-yellow { border-left: 4px solid #eab308; }
.smart-alert-item.border-red { border-left: 4px solid #ef4444; }
.smart-alert-item.border-blue { border-left: 4px solid #3b82f6; }

.smart-alert-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.smart-alert-icon.bg-orange { background-color: #fff7ed; color: #ea580c; }
.smart-alert-icon.bg-yellow { background-color: #fefce8; color: #ca8a04; }
.smart-alert-icon.bg-red { background-color: #fef2f2; color: #dc2626; }
.smart-alert-icon.bg-blue { background-color: #eff6ff; color: #2563eb; }

[data-theme='dark'] .smart-alert-icon.bg-orange { background-color: rgba(249,115,22,0.12); }
[data-theme='dark'] .smart-alert-icon.bg-yellow { background-color: rgba(234,179,8,0.12); }
[data-theme='dark'] .smart-alert-icon.bg-red { background-color: rgba(239,68,68,0.12); }
[data-theme='dark'] .smart-alert-icon.bg-blue { background-color: rgba(59,130,246,0.12); }

.smart-alert-content {
  flex: 1;
  min-width: 0;
}

.smart-alert-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.smart-alert-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.smart-alert-action {
  font-size: 0.8rem;
  font-weight: 800;
  color: #ea580c;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.smart-alert-action:hover {
  text-decoration: underline;
}

.smart-alert-countdown {
  background-color: #dcfce7;
  color: #166534;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  white-space: nowrap;
  flex-shrink: 0;
}

[data-theme='dark'] .smart-alert-countdown {
  background-color: rgba(22,163,74,0.15);
  color: #4ade80;
}

.smart-alert-dismiss {
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.smart-alert-dismiss:hover {
  color: var(--color-text);
}

.smart-alert-badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}

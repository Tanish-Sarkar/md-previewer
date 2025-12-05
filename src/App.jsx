import { useEffect, useState } from "react";
import MarkdownPreview from "./MarkdownPreview";

const DEFAULT_MD = `# Markdown Previewer

Type some *Markdown* on the left 👈  
and see the **preview** on the right 👉

## Features

- GitHub-style tables
- Task lists
- \`inline code\` and code blocks
- Footnotes, math, and more

### Table

| Syntax | Description |
| ------ | ----------- |
| Header | Title       |
| Paragraph | Text     |

### Task list

- [x] Build app UI
- [x] Add dark/light mode
- [x] Add resizable panels
- [ ] Deploy online

### Code block

\`\`\`js
function greet(name) {
  console.log(\`Hello, \${name}\`);
}
\`\`\`

### Math

Inline: $E = mc^2$

Block:

$$
\\int_0^1 x^2 dx = \\frac{1}{3}
$$
`;

export default function App() {
  const [markdown, setMarkdown] = useState(() => {
    return localStorage.getItem("markdown-text") || DEFAULT_MD;
  });

  const [theme, setTheme] = useState("dark"); // 'light' | 'dark'
  const [split, setSplit] = useState(50); // editor width % (20–80)
  const [isDragging, setIsDragging] = useState(false);

  // Load theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Apply theme to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Autosave markdown
  useEffect(() => {
    localStorage.setItem("markdown-text", markdown);
  }, [markdown]);

  // Drag to resize panels
  useEffect(() => {
    function handleMouseMove(e) {
      if (!isDragging) return;
      const newPercent = (e.clientX / window.innerWidth) * 100;
      const clamped = Math.min(80, Math.max(20, newPercent));
      setSplit(clamped);
    }

    function handleMouseUp() {
      if (isDragging) {
        setIsDragging(false);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-slate-50 text-slate-900
        dark:bg-slate-950 dark:text-slate-100
        transition-colors duration-300
      "
    >
      {/* Header */}
      <header
        className="
          border-b border-slate-200 dark:border-slate-800
          px-4 py-3 flex items-center justify-between
          bg-white/80 dark:bg-slate-950/80
          backdrop-blur
        "
      >
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">
            Markdown Previewer
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 uppercase">
            Offline Ready
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMarkdown(DEFAULT_MD)}
            className="
              hidden sm:inline-flex text-[11px] border border-slate-300 dark:border-slate-700
              rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800
              transition-colors
            "
          >
            Reset demo
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="
              flex items-center gap-1 text-xs
              border border-slate-300 dark:border-slate-700
              rounded-full px-3 py-1
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition-colors
            "
          >
            <span className="text-sm">
              {theme === "dark" ? "🌙" : "☀️"}
            </span>
            <span className="hidden sm:inline">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </header>

      {/* Main layout with resizable panels */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <section
          className="
            h-full flex flex-col
            border-r border-slate-200 dark:border-slate-800
          "
          style={{ width: `${split}%` }}
        >
          <div
            className="
              px-4 py-2 border-b border-slate-200 dark:border-slate-800
              text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400
              flex items-center justify-between
            "
          >
            <span>Editor</span>
            <span className="text-[10px] text-slate-400">
              {split.toFixed(0)}%
            </span>
          </div>
          <textarea
            className="
              flex-1 w-full
              bg-slate-50 dark:bg-slate-950
              text-slate-900 dark:text-slate-100
              p-4 focus:outline-none resize-none text-sm font-mono
              transition-colors duration-300
            "
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck="false"
          />
        </section>

        {/* Drag handle */}
        <div
          className={`
            hidden md:block
            w-1 cursor-col-resize
            bg-slate-200 dark:bg-slate-800
            hover:bg-slate-300 dark:hover:bg-slate-700
            transition-colors
          `}
          onMouseDown={() => setIsDragging(true)}
        />

        {/* Preview */}
        <section className="flex-1 h-full flex flex-col">
          <div
            className="
              px-4 py-2 border-b border-slate-200 dark:border-slate-800
              text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400
            "
          >
            Preview
          </div>
          <div className="flex-1 overflow-auto p-4">
            <MarkdownPreview markdown={markdown} />
          </div>
        </section>
      </main>
    </div>
  );
}

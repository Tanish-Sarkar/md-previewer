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
- [ ] Add PWA
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

  // Autosave to localStorage
  useEffect(() => {
    localStorage.setItem("markdown-text", markdown);
  }, [markdown]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">
            Markdown Previewer
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase">
            Offline Ready
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Built by Tanish 🧠
        </span>
      </header>

      {/* Main layout */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* Editor */}
        <section className="border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
          <div className="px-4 py-2 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400 flex items-center justify-between">
            <span>Editor</span>
            <button
              type="button"
              className="text-[10px] border border-slate-700 rounded px-2 py-0.5 hover:bg-slate-800"
              onClick={() => setMarkdown(DEFAULT_MD)}
            >
              Reset demo
            </button>
          </div>
          <textarea
            className="flex-1 w-full bg-slate-950 text-slate-100 p-4 focus:outline-none resize-none text-sm font-mono"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck="false"
          />
        </section>

        {/* Preview */}
        <section className="flex flex-col">
          <div className="px-4 py-2 border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
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

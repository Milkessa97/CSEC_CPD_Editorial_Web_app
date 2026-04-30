import { useState } from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "Python" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxLanguage = language.toLowerCase() === "py" ? "Python" : language.toLowerCase();

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border-custom bg-[#1E1E1E] font-mono text-sm leading-relaxed shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-border-custom">
        <span className="text-[10px] text-muted font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-primary" />
          {language}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRevealed(!isRevealed)}
            className="p-1.5 hover:bg-surface rounded-md transition-colors text-muted hover:text-accent-secondary"
            title={isRevealed ? "Hide Code" : "Reveal Code"}
          >
            {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          <button
            onClick={copyToClipboard}
            className="p-1.5 hover:bg-surface rounded-md transition-colors text-muted hover:text-accent-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy Code"
            disabled={!isRevealed}
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      
      <div className="relative p-2 overflow-x-auto min-h-[150px]">
        {!isRevealed && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1E1E1E]/60 backdrop-blur-sm">
            <button
              onClick={() => setIsRevealed(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-border-custom text-white font-bold tracking-wide hover:border-accent-primary hover:text-accent-primary transition-all shadow-xl group/btn"
            >
              <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
              Reveal Solution
            </button>
            <p className="text-xs text-muted mt-4 font-mono tracking-widest">Try solving it yourself first!</p>
          </div>
        )}
        <div className={!isRevealed ? "opacity-20 select-none blur-[4px] pointer-events-none" : ""}>
          <SyntaxHighlighter
            language={syntaxLanguage}
            style={vscDarkPlus}
            customStyle={{
              background: 'transparent',
              padding: '1.5rem',
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
            }}
            codeTagProps={{
              className: "font-mono"
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

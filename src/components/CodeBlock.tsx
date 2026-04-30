import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border-custom bg-[#1E1E1E] font-mono text-sm leading-relaxed">
      <div className="flex items-center justify-between px-4 py-3 bg-[#111116] border-b border-border-custom">
        <span className="text-xs text-muted font-semibold uppercase tracking-widest">python solution</span>
        <button
          onClick={copyToClipboard}
          className="p-2 hover:bg-surface rounded-md transition-colors text-muted hover:text-accent-secondary"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-2 overflow-x-auto">
        <SyntaxHighlighter
          language="python"
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
  );
}

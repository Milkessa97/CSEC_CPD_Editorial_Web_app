import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Hash, Workflow, Target, Clock } from "lucide-react";
import { Problem } from "../types";
import { CodeBlock } from "./CodeBlock";

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDisabled = problem.difficulty.toLowerCase().includes("cooking");

  const getDifficultyColor = (difficulty: Problem["difficulty"]) => {
    switch (difficulty) {
      case "Easy": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medium": return "text-accent-primary bg-accent-primary/10 border-accent-primary/20";
      case "Hard": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "Expert": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default: return "text-secondary bg-surface border-border-custom";
    }
  };

  const formatComplexity = (complexity: string) => {
    const parts = complexity.split("**");
    if (parts.length === 1) return complexity;
    
    return (
      <>
        {parts[0]}
        {parts.slice(1).map((part, i) => {
          // Detect where the superscript ends (e.g., if there's a closing parenthesis or space)
          const match = part.match(/^([a-zA-Z0-9]+)(.*)$/);
          if (match) {
            return (
              <span key={i}>
                <sup className="text-[0.7em] leading-none ml-[1px]">{match[1]}</sup>
                {match[2]}
              </span>
            );
          }
          return <sup key={i}>{part}</sup>;
        })}
      </>
    );
  };

  return (
    <motion.div
      layout
      className="glass-card mb-6 group hover:translate-y-[-2px] transition-all"
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      <div 
        className={`p-8 flex items-center justify-between transition-colors ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-white/[0.02]'}`}
        onClick={() => !isDisabled && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-8">
          <div className="w-10 h-10 flex items-center justify-center font-display font-bold text-2xl text-muted transition-colors">
            {problem.id}
          </div>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h3 className={`text-2xl font-display font-bold tracking-tight ${isDisabled ? 'text-white/40' : ''}`}>{problem.title}</h3>
              {isDisabled ? (
                <span className="px-3 py-1 text-[10px] uppercase font-bold rounded-md border tracking-wider text-amber-400 bg-amber-400/10 border-amber-400/20 flex items-center gap-2 animate-pulse">
                  🍳 Coming Soon
                </span>
              ) : (
                <span className={`px-2.5 py-1 text-[9px] uppercase font-bold rounded-md border tracking-wider ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {problem.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-muted uppercase tracking-widest flex items-center gap-1.5 font-bold transition-colors hover:bg-white/10 hover:border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-border-custom group-hover:bg-accent-secondary transition-colors shadow-sm" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {isDisabled ? (
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-border-custom text-xl" title="Editorial coming soon">

          </div>
        ) : (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-border-custom group-hover:border-white/20 transition-colors"
          >
            <ChevronDown size={20} className="text-muted group-hover:text-white transition-colors" />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && !isDisabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden bg-background/30"
          >
            <div className="px-10 pb-10 pt-4 border-t border-border-custom">
              <div className="space-y-12">
                
                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white font-display font-bold uppercase tracking-[0.2em] text-[10px]">
                        <Target size={14} className="text-muted" />
                        Problem Breakdown
                      </div>
                      <p className="text-secondary leading-relaxed text-[15px]">
                        {problem.explanation}
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-center gap-2 text-accent-secondary font-display font-bold uppercase tracking-[0.2em] text-[10px]">
                        <Workflow size={14} />
                        Step-by-Step Approach
                      </div>
                      <ul className="space-y-4">
                        {problem.approach.map((step, idx) => (
                          <li key={idx} className="flex gap-4 text-secondary leading-relaxed text-[15px] group/item">
                            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-surface border border-border-custom flex items-center justify-center text-[10px] font-bold text-muted group-hover/item:text-accent-secondary group-hover/item:border-accent-secondary transition-all">
                              {idx + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Implementation</div>
                      <div className="px-3 py-1.5 rounded-lg bg-surface border border-border-custom text-[10px] font-mono text-accent-primary font-bold flex items-center gap-2 shadow-sm">
                        <Clock size={12} className="text-muted" />
                        <span>{formatComplexity(problem.optimizedSolution)}</span>
                      </div>
                    </div>
                    <CodeBlock code={problem.code} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

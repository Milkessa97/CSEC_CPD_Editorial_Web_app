import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Calendar, Users, Trophy } from "lucide-react";
import { Contest } from "../types";
import { formatCMSDate } from "../lib/utils";

interface ContestCardProps {
  contest: Contest;
}

export function ContestCard({ contest }: ContestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <Link to={`/contest/${contest.id}`} className="block h-full">
        <div className="absolute inset-0 bg-accent-primary/5 blur-xl group-hover:bg-accent-primary/10 transition-colors rounded-3xl" />
        
        <div className="relative h-full bg-surface-custom border border-white/5 rounded-2xl p-6 overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-primary/10 blur-2xl rounded-full" />
          
          <div className="flex flex-col h-full space-y-4">
            <div className="flex items-center justify-between mb-2">
               <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-accent-primary">
                <Trophy size={14} />
                CPD Editorial
              </div>
              <div className="flex items-center gap-1 text-muted text-xs font-mono">
                <Calendar size={12} />
                {formatCMSDate(contest.date)}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-accent-primary transition-colors">
                {contest.name}
              </h3>
              <p className="text-muted text-sm line-clamp-2 leading-relaxed">
                {contest.description}
              </p>
            </div>

            <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted/50 font-bold">Problems</span>
                  <span className="text-sm font-mono text-white">{contest.stats.problemCount} Tasks</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted/50 font-bold">Range</span>
                  <span className="text-sm font-mono text-white">{contest.stats.difficultyRange}</span>
                </div>
              </div>

              <div className="p-2 rounded-full bg-white/5 group-hover:bg-accent-primary/20 transition-colors">
                <Trophy size={16} className="text-muted group-hover:text-accent-primary transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

import { motion } from "motion/react";
import { formatCMSDate } from "../lib/utils";
import { Trophy, ExternalLink } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  date: string;
  difficulty?: string;
  contestLink?: string;
}

export function Hero({ title, subtitle, date, difficulty, contestLink }: HeroProps) {
  const getGlowColor = () => {
    if (!difficulty) return "bg-accent-primary/10";
    const d = difficulty.toLowerCase();
    if (d.includes("hard") || d.includes("expert")) return "bg-purple-500/15";
    if (d.includes("medium")) return "bg-accent-primary/15";
    if (d.includes("easy")) return "bg-green-500/15";
    return "bg-accent-primary/10";
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Decorative Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] rounded-full -z-10 transition-colors duration-1000 ${getGlowColor()}`} />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative group">
            <div className={`absolute inset-0 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-all duration-500 ${getGlowColor()}`} />
            <Trophy className="text-white" size={40} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
          {difficulty ? `Range: ${difficulty}` : "Editorials Live"}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-secondary bg-clip-text text-transparent"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-secondary mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {contestLink && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-10"
          >
            <a 
              href={contestLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-primary text-white font-bold tracking-wide hover:bg-accent-secondary hover:scale-105 transition-all shadow-[0_0_20px_rgba(var(--color-accent-primary),0.3)]"
            >
              Go to Contest
              <ExternalLink size={18} />
            </a>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted font-mono text-sm uppercase tracking-widest"
        >
          {formatCMSDate(date)}
        </motion.div>
      </div>
    </section>
  );
}

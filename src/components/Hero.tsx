import { motion } from "motion/react";
import { formatCMSDate } from "../lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  date: string;
  difficulty?: string;
}

export function Hero({ title, subtitle, date, difficulty }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto text-center">


        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
          {difficulty ? `Range: ${difficulty}` : "Editorials Live"}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-secondary bg-clip-text text-transparent"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
        
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

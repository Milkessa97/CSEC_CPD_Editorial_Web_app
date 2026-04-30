import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Hero } from "./Hero";
import { StatsSection } from "./StatsSection";
import { ProblemCard } from "./ProblemCard";
import { Footer } from "./Footer";
import { useContest } from "../hooks/useContent";
import { List, Loader2, ArrowLeft } from "lucide-react";

export function ContestEditorial() {
  const { contestId } = useParams<{ contestId: string }>();
  const { contest, loading, error } = useContest(contestId);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-accent-primary" size={40} />
        <p className="font-display text-muted uppercase tracking-widest text-xs">Loading editorial data...</p>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
          <ArrowLeft size={32} />
        </div>
        <h2 className="text-2xl font-display font-bold text-white">Editorial Not Found</h2>
        <p className="text-muted max-w-md">We couldn't find the editorial you're looking for. It may have been moved or removed.</p>
        <Link to="/" className="px-8 py-3 bg-accent-primary text-white rounded-full font-bold hover:opacity-90 transition-opacity">
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 selection:bg-accent-primary/20 selection:text-accent-primary">
      <Link 
        to="/" 
        className="fixed top-8 left-8 z-50 p-3 rounded-full bg-surface/80 backdrop-blur border border-white/5 text-muted hover:text-accent-primary hover:border-accent-primary/20 transition-all group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      </Link>
      
      <main>
        <Hero 
          title={contest.name} 
          subtitle={contest.description} 
          date={contest.date} 
          difficulty={contest.stats.difficultyRange}
        />

        <StatsSection 
          problemCount={contest.stats.problemCount}
          participants={contest.stats.participants}
          difficultyRange={contest.stats.difficultyRange}
        />

        <section id="problems" className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-10 h-10 rounded-lg bg-surface border border-border-custom flex items-center justify-center text-accent-secondary">
                <List size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold tracking-tight text-white">Problem Set</h2>
                <p className="text-sm text-muted">Complete editorial solutions for all problems in this round</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contest.problems.map((problem, i) => (
                <motion.div
                  key={problem.safeKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <ProblemCard problem={problem} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

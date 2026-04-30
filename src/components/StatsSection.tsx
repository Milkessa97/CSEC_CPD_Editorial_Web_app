import { motion } from "motion/react";
import { Files, Users, Zap } from "lucide-react";

interface StatsSectionProps {
  problemCount: number;
  participants: number;
  difficultyRange: string;
}

export function StatsSection({ problemCount, participants, difficultyRange }: StatsSectionProps) {
  const stats = [
    { label: "Problems", value: problemCount.toString(), icon: Files },
    { label: "Difficulty", value: difficultyRange, icon: Zap },
    { label: "Participants", value: participants.toLocaleString(), icon: Users },
  ];

  return (
    <section id="overview" className="section-container py-16">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-background border border-border-custom flex items-center justify-center text-muted group-hover:text-accent-secondary transition-all duration-500 scale-95 group-hover:scale-100 group-hover:border-accent-secondary/50 mb-6">
                  <stat.icon size={22} />
                </div>
                <dt className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-2">{stat.label}</dt>
                <dd className="text-3xl font-display font-bold tracking-tight">{stat.value}</dd>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

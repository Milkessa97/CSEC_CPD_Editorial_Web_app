import { motion } from "motion/react";
import { Files, Users, Zap } from "lucide-react";

interface StatsSectionProps {
  problemCount: number;
  participants: number;
  difficultyRange: string;
}

export function StatsSection({ problemCount, participants, difficultyRange }: StatsSectionProps) {
  const stats = [
    { label: "Problems", value: problemCount.toString(), icon: Files, color: "text-accent-primary", glow: "bg-accent-primary/20", border: "group-hover:border-accent-primary/50" },
    { label: "Difficulty", value: difficultyRange, icon: Zap, color: "text-purple-500", glow: "bg-purple-500/20", border: "group-hover:border-purple-500/50" },
    { label: "Participants", value: participants.toLocaleString(), icon: Users, color: "text-blue-500", glow: "bg-blue-500/20", border: "group-hover:border-blue-500/50" },
  ];

  return (
    <section id="overview" className="section-container py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="relative p-8 rounded-[2rem] bg-surface-custom border border-white/5 overflow-hidden group cursor-default"
          >
            {/* Ambient Background Glow on Hover */}
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full ${stat.glow}`} />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-8">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-300 group-hover:bg-transparent ${stat.border}`}
                >
                  <stat.icon size={26} className={`text-white/40 group-hover:${stat.color.split('-')[1]}-${stat.color.split('-')[2] || '500'} ${stat.color} transition-colors duration-300`} />
                </motion.div>
                <dt className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors mt-2">
                  {stat.label}
                </dt>
              </div>
              
              <div>
                <dd className="text-4xl lg:text-5xl font-display font-bold tracking-tight text-white transition-colors duration-300">
                  <span className={`bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70 group-hover:from-white group-hover:to-white/30 transition-all`}>
                    {stat.value}
                  </span>
                </dd>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

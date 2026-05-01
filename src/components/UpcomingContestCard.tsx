import { motion } from "motion/react";
import { Calendar, Rocket, Sparkles, Clock } from "lucide-react";
import { Contest } from "../types";
import { formatCMSDate } from "../lib/utils";

interface UpcomingContestCardProps {
  contest: Contest;
}

export function UpcomingContestCard({ contest }: UpcomingContestCardProps) {
  const formattedDate = formatCMSDate(contest.date);

  // Generate Google Calendar Add Event Link
  const d = new Date(formattedDate);
  let datesQuery = "";
  if (!isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    // For all day event format is YYYYMMDD/YYYYMMDD (end date is exclusive so we add 1 day, but same day is often fine for a rough mark)
    // Actually Google calendar all day event requires end date to be the next day. Let's make it the next day:
    const nextDay = new Date(d);
    nextDay.setDate(nextDay.getDate() + 1);
    const endYyyy = nextDay.getFullYear();
    const endMm = String(nextDay.getMonth() + 1).padStart(2, '0');
    const endDd = String(nextDay.getDate()).padStart(2, '0');
    
    datesQuery = `&dates=${yyyy}${mm}${dd}/${endYyyy}${endMm}${endDd}`;
  }
  
  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`CSEC Contest: ${contest.name}`)}${datesQuery}&details=${encodeURIComponent(contest.description || "Upcoming CSEC CPD Contest")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <motion.div
        animate={{ 
          y: [0, -6, 0],
          rotateZ: [0, -0.5, 0]
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
          rotateZ: { repeat: Infinity, duration: 6, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.02 }}
        className="relative h-full"
      >
        {/* Animated gradient border glow */}
        <div className="absolute -inset-0.5 bg-linear-to-r from-accent-primary via-purple-500 to-accent-primary rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
        
        <div className="relative h-full bg-surface-custom border border-white/10 rounded-2xl p-8 overflow-hidden flex flex-col">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none" />
        
        {/* Top bar with pulsing badge */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Upcoming</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70 text-xs font-mono bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
            <Calendar size={12} className="text-accent-primary" />
            {formattedDate}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-accent-primary transition-colors duration-300">
            {contest.name}
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            {contest.description || "Get ready for the next challenge! Details will be revealed soon."}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 mt-auto pt-6 flex items-center justify-between border-t border-white/10">
          <div className="flex items-center gap-3 text-muted">
            <Clock size={16} className="text-accent-primary" />
            <span className="text-xs font-mono">Mark your calendar</span>
          </div>
          <motion.a 
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-accent-primary to-purple-600 text-white font-bold shadow-[0_0_20px_rgba(var(--color-accent-primary),0.4)] border border-white/10 hover:shadow-[0_0_30px_rgba(var(--color-accent-primary),0.6)] hover:from-accent-primary/90 hover:to-purple-500 transition-all cursor-pointer flex items-center gap-2"
            title="Add to Google Calendar"
          >
            <Calendar size={16} />
            <span>Remind Me</span>
          </motion.a>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useCMSData } from "../hooks/useContent";
import { ContestCard } from "./ContestCard";
import { UpcomingContestCard } from "./UpcomingContestCard";
import { Loader2, AlertCircle, ChevronDown, Search, Rocket } from "lucide-react";
import logo from "../../public/CSEC ASTU.png"

const BATCH_SIZE = 6;

export function LandingPage() {
  const { data, loading, error } = useCMSData();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const contests = data?.contests || [];
  const upcomingContests = contests.filter(c => c.isUpcoming).slice(0, 3);
  const pastContests = contests.filter(c => !c.isUpcoming);

  const filteredPastContests = pastContests.filter(contest => {
    const words = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return true;
    const haystack = `${contest.name} ${contest.description}`.toLowerCase();
    return words.every(word => haystack.includes(word));
  });

  const visibleContests = filteredPastContests.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPastContests.length;

  // Reset visible count when search query changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchQuery]);

  // IntersectionObserver for infinite scroll
  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filteredPastContests.length));
  }, [filteredPastContests.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const scrollToUpcoming = () => {
    document.getElementById("upcoming-contests-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContests = () => {
    document.getElementById("contests-section")?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-accent-primary" size={40} />
          <p className="text-muted font-mono animate-pulse">Synchronizing editoral database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-md w-full p-8 rounded-2xl bg-red-500/5 border border-red-500/20 text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-display font-bold text-white mb-2">Sync Error</h2>
          <p className="text-muted text-sm mb-6">
            We couldn't reach the CMS database. Please check your network or spreadsheet configuration.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* SECTION 1: HERO */}
      <section className="min-h-screen shrink-0 snap-start flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

        <header className="text-center max-w-4xl mx-auto z-10 flex flex-col items-center relative">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex flex-col items-center mb-6 md:mb-8"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center drop-shadow-[0_0_40px_rgba(var(--color-accent-primary),0.3)] hover:scale-105 transition-transform duration-500 cursor-pointer">
              <img src={logo} alt="CSEC ASTU Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight mb-6 leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-accent-primary to-orange-400 bg-clip-text text-transparent italic filter drop-shadow-[0_0_15px_rgba(var(--color-accent-primary),0.3)]">CPD Division</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-2xl mx-auto mb-10"
          >
            Official contest editorials and solutions focused on building strong problem-solving skills.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={scrollToUpcoming}
              className="px-8 py-4 rounded-full bg-accent-primary text-white font-bold text-lg hover:bg-[#ffb94f] transition-all hover:scale-105 shadow-[0_0_20px_rgba(var(--color-accent-primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--color-accent-primary),0.6)]"
            >
              Start Exploring
            </button>
            <button 
              onClick={scrollToContests}
              className="px-8 py-4 rounded-full bg-white/5 text-white font-bold text-lg border border-white/10 hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm"
            >
              Past Editorials
            </button>
          </motion.div>
        </header>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ 
            delay: 0.8, 
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          onClick={scrollToUpcoming}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent-primary transition-colors flex flex-col items-center gap-2 cursor-pointer z-10"
        >
          <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
          <ChevronDown size={24} />
        </motion.button>
      </section>

      {/* SECTION 2: UPCOMING CONTESTS */}
      <section id="upcoming-contests-section" className="min-h-screen shrink-0 snap-start py-20 px-6 relative z-10 bg-background flex flex-col justify-center">
        {/* Subtle background glow for upcoming */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-primary/5 via-background to-background pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
            >
              Upcoming <span className="text-accent-primary italic">Contests</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg"
            >
              Prepare for the next challenge. Check out what's on the horizon for the CPD division.
            </motion.p>
          </div>

          <div className="w-full">
            {upcomingContests.length > 0 ? (
              <div className={`grid grid-cols-1 ${upcomingContests.length === 1 ? 'max-w-md mx-auto' : upcomingContests.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 w-full`}>
                {upcomingContests.map((contest, i) => (
                  <motion.div 
                    key={contest.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <UpcomingContestCard contest={contest} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto py-20 px-8 text-center border border-white/5 rounded-3xl bg-surface-custom/50 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <Rocket className="mx-auto text-accent-primary/50 mb-6" size={48} />
                <h3 className="text-2xl font-display font-bold text-white mb-2">No Upcoming Contests</h3>
                <p className="text-muted">
                  We're brewing up new challenges. Check back later or explore our past editorials below!
                </p>
              </motion.div>
            )}
          </div>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            onClick={scrollToContests}
            className="mt-20 text-muted hover:text-accent-primary transition-colors flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Past Editorials</span>
            <ChevronDown className="animate-bounce" size={24} />
          </motion.button>
        </div>
      </section>

      {/* SECTION 3: PAST CONTESTS */}
      <section id="contests-section" className="min-h-screen shrink-0 snap-start py-20 px-6 relative z-10 bg-background flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Latest <span className="text-accent-primary italic">Contests</span></h2>
              <p className="text-muted text-lg">Browse our deep-dive analyses and optimized solutions for recent university and international contests.</p>
            </div>
            
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search contests by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border-custom rounded-xl text-white placeholder-muted focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/50 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleContests.length > 0 ? (
              visibleContests.map((contest) => (
                <ContestCard key={contest.id} contest={contest} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                <p className="text-muted text-lg italic">
                  {pastContests.length > 0 ? "No contests match your search." : "No past contests available."}
                </p>
              </div>
            )}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div className="flex flex-col items-center mt-12 gap-6">
              <div ref={sentinelRef} className="w-full h-4" />
              <button
                onClick={loadMore}
                className="px-8 py-3 rounded-full bg-white/5 text-white font-bold text-sm border border-white/10 hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm"
              >
                Load More ({filteredPastContests.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {!hasMore && visibleContests.length > BATCH_SIZE && (
            <p className="text-center text-muted text-xs mt-10 font-mono uppercase tracking-widest">
              You've reached the end
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

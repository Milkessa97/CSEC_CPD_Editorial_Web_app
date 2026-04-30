import { useState } from "react";
import { motion } from "motion/react";
import { useCMSData } from "../hooks/useContent";
import { ContestCard } from "./ContestCard";
import { Loader2, AlertCircle, ChevronDown, Search } from "lucide-react";
import logo from "../../public/CSEC ASTU.png"

export function LandingPage() {
  const { data, loading, error } = useCMSData();
  const [searchQuery, setSearchQuery] = useState("");

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

  const contests = data?.contests || [];
  
  const filteredContests = contests.filter(contest => 
    contest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToContests = () => {
    document.getElementById("contests-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* SECTION 1: HERO */}
      <section className="min-h-screen shrink-0 snap-start flex flex-col items-center justify-center px-6 relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <header className="text-center max-w-4xl mx-auto z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex flex-col items-center mb-4 md:mb-6"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center drop-shadow-[0_0_30px_rgba(var(--color-accent-primary),0.2)]">
              <img src={logo} alt="CSEC ASTU Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight mb-6 leading-[1.1]"
          >
            <span className="text-accent-primary italic">CPD Division</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-2xl mx-auto"
          >
            Official contest editorials and solutions focused on building strong problem-solving skills.
          </motion.p>
        </header>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          onClick={scrollToContests}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted hover:text-accent-primary transition-colors flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-xs font-semibold uppercase tracking-widest">Explore</span>
          <ChevronDown className="animate-bounce" size={24} />
        </motion.button>
      </section>

      {/* SECTION 2: CONTESTS */}
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
            {filteredContests.length > 0 ? (
              filteredContests.map((contest) => (
                <ContestCard key={contest.id} contest={contest} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                <p className="text-muted text-lg italic">
                  {contests.length > 0 ? "No contests match your search." : "No contests published yet. Stay tuned!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

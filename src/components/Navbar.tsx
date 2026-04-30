import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-custom px-6 h-16 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center text-background">
          <Terminal size={18} strokeWidth={2.5} />
        </div>
        <span className="font-display font-bold text-xl tracking-tight">ALGORITHMIA</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
        <a href="#hero" className="hover:text-white transition-colors">Contest</a>
        <a href="#overview" className="hover:text-white transition-colors">Overview</a>
        <a href="#problems" className="hover:text-white transition-colors">Problems</a>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium px-4 py-2 rounded-full border border-border-custom hover:bg-surface transition-colors">
          Archives
        </button>
        <button className="text-sm font-medium px-4 py-2 rounded-full bg-accent-secondary text-white hover:opacity-90 transition-opacity">
          Subscribe
        </button>
      </div>
    </motion.nav>
  );
}

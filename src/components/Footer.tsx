import { motion } from "motion/react";
import { Linkedin, Send, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://linkedin.com/company/csec-astu" },
    { name: "Telegram", icon: <Send size={20} />, href: "https://t.me/CSEC_ASTU" },
  ];

  return (
    <footer className="mt-20 py-12 px-6 border-t border-white/5 bg-accent-primary/2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="font-display font-bold text-xl tracking-tight mb-2">
            CSEC ASTU <span className="text-accent-primary">CPD</span> Division
          </div>
          <p className="text-muted text-sm max-w-xs">
            The Competitive Programming Development division of CSEC ASTU. Building competitive programmers, one problem at a time.
          </p>
        </div>

        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "var(--color-accent-primary)" }}
              className="text-muted transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-muted text-xs uppercase tracking-widest mb-1">
            © {currentYear} CSEC ASTU
          </p>
          <p className="text-[10px] text-muted/50 uppercase tracking-[0.2em]">
            Built with Passion for Algorithms
          </p>
        </div>
      </div>
    </footer>
  );
}

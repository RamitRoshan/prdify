import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0a0a]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="p-1.5 bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-cyan rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)]"
            >
              <Box className="text-white w-5 h-5" />
            </motion.div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
              PRDify
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Dashboard
            </Link>
            <Link to="/projects" className="text-sm text-slate-300 hover:text-white font-medium transition-colors">
              Projects
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/generate" className="relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-white px-6 font-medium text-slate-900 transition-all hover:bg-slate-200">
                New Project
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Plus, FolderOpen } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-white mb-3 tracking-tight"
        >
          Welcome Back
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg"
        >
          Manage your AI-generated product requirements and drafts.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="glass-card p-10 rounded-3xl flex flex-col items-start group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full filter blur-[80px] group-hover:bg-brand-blue/20 transition-all duration-500"></div>
          
          <div className="w-14 h-14 bg-brand-blue/20 text-brand-blue rounded-2xl flex items-center justify-center mb-8 border border-brand-blue/30 group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Create New PRD</h2>
          <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">Got a new app idea? Describe it in a few words and let our AI structure it instantly.</p>
          <Link to="/generate" className="mt-auto inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-slate-200 transition-colors">
            Start Generating
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="glass-card p-10 rounded-3xl flex flex-col items-start group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full filter blur-[80px] group-hover:bg-brand-purple/20 transition-all duration-500"></div>
          
          <div className="w-14 h-14 bg-brand-purple/20 text-brand-purple rounded-2xl flex items-center justify-center mb-8 border border-brand-purple/30 group-hover:scale-110 transition-transform duration-300">
            <FolderOpen className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">View Projects</h2>
          <p className="text-slate-400 mb-8 leading-relaxed max-w-sm">Access your previously generated PRDs, export them, or chat with the AI to refine them.</p>
          <Link to="/projects" className="mt-auto inline-flex items-center gap-2 glass text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
            Open Library
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

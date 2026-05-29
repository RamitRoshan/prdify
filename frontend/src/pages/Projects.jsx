import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, Loader2, Clock, Plus } from 'lucide-react';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/prds');
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center relative z-10">
        <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="mb-12 flex justify-between items-end border-b border-white/10 pb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">My Projects</h1>
          <p className="text-slate-400 text-sm">Manage and refine your generated PRDs.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/generate" className="hidden md:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm">
            <Plus className="w-4 h-4" /> New Project
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 rounded-3xl text-center max-w-2xl mx-auto border border-dashed border-white/20 mt-12"
          >
            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/5">
              <FileText className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No PRDs yet</h3>
            <p className="text-slate-400 mb-8 font-light">Start your journey by generating your first PRD from a raw idea.</p>
            <Link to="/generate" className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg">
              Create First Project
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-card p-6 rounded-2xl flex flex-col h-full group relative overflow-hidden"
              >
                {/* Subtle gradient hover reveal */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-purple/0 group-hover:from-brand-blue/5 group-hover:to-brand-purple/5 transition-all duration-500 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="p-2.5 bg-white/5 text-slate-300 rounded-xl border border-white/5 group-hover:border-white/10 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 tracking-tight relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{project.title}</h3>
                <p className="text-sm text-slate-400 mb-8 flex-grow line-clamp-3 font-light relative z-10 leading-relaxed">"{project.rawIdea}"</p>
                
                <Link to={`/projects/${project._id}`} className="mt-auto inline-flex items-center text-sm font-medium text-brand-blue group-hover:text-blue-400 transition-colors relative z-10">
                  View Document <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;

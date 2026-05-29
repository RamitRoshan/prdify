import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Target, Users, MonitorSmartphone, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const GeneratePRD = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rawIdea: '',
    category: '',
    audience: '',
    platform: 'Web & Mobile'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 250)}px`;
    }
  }, [formData.rawIdea]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rawIdea.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/prds/generate', formData);
      navigate(`/projects/${response.data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to generate PRD. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-16 min-h-screen flex flex-col items-center justify-center relative px-4 z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl flex flex-col items-center text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-brand-purple mb-6 shadow-inner">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">What are you building?</h1>
        <p className="text-slate-400 text-lg max-w-xl font-light">Describe your app idea naturally. Our agent will analyze, structure, and draft a production-ready PRD.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-3xl relative"
      >
        <form onSubmit={handleSubmit} className="relative z-20">
          <div className={`glass-card rounded-[2rem] p-2 transition-all duration-300 ${loading ? 'opacity-50 pointer-events-none scale-[0.98]' : 'focus-within:ring-2 focus-within:ring-brand-purple/50 focus-within:border-brand-purple/50'}`}>
            <textarea 
              ref={textareaRef}
              required
              name="rawIdea"
              value={formData.rawIdea}
              onChange={handleInputChange}
              rows="1"
              disabled={loading}
              placeholder="e.g., An app that compares grocery prices between Blinkit and Zepto..." 
              className="w-full px-6 py-6 bg-transparent text-white placeholder-slate-500 outline-none resize-none text-lg leading-relaxed min-h-[100px] max-h-[250px] overflow-y-auto"
            />
            
            <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-white/5 mt-2">
              <button 
                type="button" 
                onClick={() => setShowOptions(!showOptions)}
                className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                {showOptions ? 'Hide Options' : 'Advanced Options'}
              </button>
              
              <button 
                type="submit" 
                disabled={loading || !formData.rawIdea.trim()}
                className="bg-white text-black hover:bg-slate-200 px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Generate <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showOptions && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-card p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Target className="w-3.5 h-3.5" /> Category
                    </label>
                    <input 
                      type="text" 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g., FinTech, SaaS" 
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 focus:border-brand-purple/50 outline-none transition-all text-sm text-white placeholder-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Users className="w-3.5 h-3.5" /> Target Audience
                    </label>
                    <input 
                      type="text" 
                      name="audience"
                      value={formData.audience}
                      onChange={handleInputChange}
                      placeholder="e.g., College Students" 
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/20 focus:bg-black/40 focus:border-brand-purple/50 outline-none transition-all text-sm text-white placeholder-slate-600"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <MonitorSmartphone className="w-3.5 h-3.5" /> Platform
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['Web Only', 'Mobile Only', 'Web & Mobile', 'Desktop App'].map(platform => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => setFormData({...formData, platform})}
                          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                            formData.platform === platform 
                              ? 'bg-white text-black' 
                              : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 text-sm text-center">
            {error}
          </motion.div>
        )}
      </motion.div>

      {/* Modern AI Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16 flex flex-col items-center"
          >
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm font-medium text-slate-300 animate-pulse">Agent is drafting...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GeneratePRD;

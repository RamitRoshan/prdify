import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, FileText, Settings, Rocket, Bot } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:flex absolute top-20 left-10 glass-card p-4 rounded-2xl items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center">
            <Bot className="text-brand-purple w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
            <div className="h-2 w-16 bg-white/10 rounded"></div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden lg:flex absolute top-40 right-10 glass-card p-4 rounded-2xl items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center">
            <FileText className="text-brand-cyan w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="h-2 w-20 bg-white/20 rounded mb-2"></div>
            <div className="h-2 w-28 bg-white/10 rounded"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-purple/30 text-slate-300 font-medium text-xs tracking-wider uppercase mb-8 shadow-[0_0_20px_rgba(147,51,234,0.15)] cursor-default"
          >
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span>AI Product Manager 2.0</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[1.1]">
            Build products <br />
            <span className="text-gradient animate-gradient-x">at lightspeed.</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Turn your raw startup ideas into production-ready requirements. Our AI agent structures, analyzes, and refines your vision in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/generate" className="relative group flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg transition-all">
                <span className="absolute inset-0 rounded-full bg-white blur-md opacity-20 group-hover:opacity-50 transition-opacity"></span>
                <span className="relative z-10 flex items-center gap-2">Generate PRD <ArrowRight className="w-5 h-5" /></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/dashboard" className="flex items-center justify-center gap-2 glass text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all">
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5 relative">
        {/* Subtle background glow for features */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-brand-blue/5 blur-[120px] pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <FeatureCard 
            icon={<FileText className="w-6 h-6 text-brand-blue" />}
            title="Structured Specs"
            description="Automatically generates MVP features, personas, and tech stacks perfectly formatted."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Settings className="w-6 h-6 text-brand-purple" />}
            title="AI Refinement"
            description="Chat directly with the document to add, modify, or pivot features instantly."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Rocket className="w-6 h-6 text-brand-cyan" />}
            title="Ready to Ship"
            description="Export to PDF or Markdown. Hand it to your engineers and start building."
            delay={0.3}
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ y: -5 }}
    className="glass-card p-8 rounded-3xl group cursor-default"
  >
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

export default Home;

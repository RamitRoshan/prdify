import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Download, MessageSquare, Send, Bot, User, Sparkles, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';
import api from '../services/api';

const PRDDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Chat state
  const [chatMessage, setChatMessage] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  
  const contentRef = useRef(null);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  useEffect(() => {
    // Smooth scroll to bottom of chat
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [project?.chatHistory, isRefining]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/prds/${id}`);
      setProject(response.data);
    } catch (err) {
      setError('Failed to load project details.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    if (!contentRef.current) return;
    
    const opt = {
      margin:       [15, 15, 15, 15],
      filename:     `${project.title || 'PRD'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    // Temporarily remove dark mode prose classes to ensure text is visible on the white PDF background
    contentRef.current.classList.remove('prose-invert');
    contentRef.current.classList.remove('prose-slate');
    
    html2pdf().set(opt).from(contentRef.current).save().then(() => {
      // Restore dark mode classes after generation
      contentRef.current.classList.add('prose-invert');
      contentRef.current.classList.add('prose-slate');
    });
  };

  const handleExportMD = () => {
    const blob = new Blob([project.prdMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title || 'PRD'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefine = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const message = chatMessage;
    setChatMessage('');
    setIsRefining(true);

    try {
      const response = await api.post(`/prds/${id}/refine`, { message });
      setProject(response.data);
    } catch (err) {
      console.error(err);
      alert('Failed to refine PRD.');
    } finally {
      setIsRefining(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center relative z-10">
        <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex flex-col items-center justify-center text-center relative z-10">
        <p className="text-red-400 mb-4 bg-red-500/10 px-4 py-2 rounded-xl">{error || 'Project not found'}</p>
        <Link to="/projects" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 relative z-10">
      
      {/* Main PRD Document Content */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-2/3 flex flex-col h-[calc(100vh-8rem)]"
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <Link to="/projects" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex gap-2">
            <button onClick={handleExportMD} className="text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg border border-white/5 transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> .MD
            </button>
            <button onClick={handleExportPDF} className="text-xs font-medium bg-white hover:bg-slate-200 text-black px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="glass-card flex-grow overflow-y-auto rounded-3xl p-8 md:p-12 scroll-smooth">
          <div ref={contentRef} className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-blue prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown>
              {project.prdMarkdown}
            </ReactMarkdown>
          </div>
        </div>
      </motion.div>

      {/* Cursor-style AI Refinement Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/3 flex flex-col h-[calc(100vh-8rem)] mt-12 lg:mt-0"
      >
        <div className="glass-card rounded-3xl flex flex-col h-full overflow-hidden">
          
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-purple/20 text-brand-purple rounded-lg flex items-center justify-center border border-brand-purple/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Agent Refinement</h3>
              <p className="text-[10px] text-slate-400">Context-aware document editor</p>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-5 scroll-smooth">
            {project.chatHistory?.map((msg, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx} 
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${msg.role === 'user' ? 'bg-white/10 border-white/20 text-slate-300' : 'bg-brand-blue/20 border-brand-blue/30 text-brand-blue'}`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[85%] text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-sm border border-white/5' : 'bg-black/30 border border-white/5 text-slate-300 rounded-tl-sm'}`}>
                  {msg.role === 'assistant' && msg.content.length > 500 ? (
                     <div className="flex items-center gap-2 text-brand-cyan">
                       <FileText className="w-4 h-4" />
                       <span>Document updated successfully.</span>
                     </div>
                  ) : (
                     <span className="whitespace-pre-wrap">{msg.content}</span>
                  )}
                </div>
              </motion.div>
            ))}
            
            <AnimatePresence>
              {isRefining && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-3 flex-row"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-brand-blue/20 border border-brand-blue/30 text-brand-blue">
                     <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 bg-black/30 border border-white/5 rounded-2xl rounded-tl-sm flex items-center gap-2 text-[13px] text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-blue" />
                    Refining document...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} className="h-1" />
          </div>

          <div className="p-4 border-t border-white/10 bg-black/20">
            <form onSubmit={handleRefine} className="relative group">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="e.g. Add Stripe to Monetization..."
                disabled={isRefining}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/10 bg-white/5 focus:bg-white/10 focus:border-brand-purple/50 outline-none text-sm text-white placeholder-slate-500 disabled:opacity-50 transition-all shadow-inner"
              />
              <button 
                type="submit" 
                disabled={isRefining || !chatMessage.trim()}
                className="absolute right-2 top-2 p-1.5 bg-white text-black rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:bg-white/20 disabled:text-white/50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
          
        </div>
      </motion.div>

    </div>
  );
};

export default PRDDetails;

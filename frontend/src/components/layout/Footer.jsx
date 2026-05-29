import { Link } from 'react-router-dom';
import { Box, Twitter, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background pt-16 pb-8 border-t border-white/5 text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-cyan rounded-lg">
                <Box className="text-white w-4 h-4" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                PRDify
              </span>
            </Link>
            <p className="text-sm max-w-sm mb-6 leading-relaxed">
              Your intelligent AI Product Manager. Turn raw ideas into production-ready requirements in seconds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/generate" className="hover:text-white transition-colors">Generate PRD</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">My Projects</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} PRDify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

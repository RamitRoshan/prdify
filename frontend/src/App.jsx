import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GeneratePRD from './pages/GeneratePRD';
import Projects from './pages/Projects';
import PRDDetails from './pages/PRDDetails';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0a0a0a]">
      {/* Modern Dark Ambient Glow Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/10 mix-blend-screen filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-brand-blue/10 mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-cyan/10 mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <Navbar />
      
      <main className="flex-grow z-10 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generate" element={<GeneratePRD />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<PRDDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

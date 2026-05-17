import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Box, 
  AlertTriangle, 
  Settings, 
  LayoutDashboard, 
  Database, 
  BrainCircuit, 
  Activity,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Predictions from './pages/Predictions';
import Reports from './pages/Reports';

/** Utility for Tailwind merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link to={path}>
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative mb-1",
      active ? "bg-brand/10 text-brand shadow-[inset_0_0_10px_rgba(255,78,0,0.1)]" : "text-white/40 hover:bg-white/5 hover:text-white"
    )}>
      {active && <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-6 bg-brand rounded-r-full" />}
      <Icon size={18} className={clsx(active ? "text-brand" : "group-hover:translate-x-1 transition-transform opacity-70 group-hover:opacity-100")} />
      <span className="font-bold text-[13px] tracking-tight">{label}</span>
    </div>
  </Link>
);

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface-dark flex bg-grid text-white font-sans selection:bg-brand/30 selection:text-brand">
      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-64 border-r border-border-subtle bg-surface-dark/95 backdrop-blur-3xl z-50 fixed lg:relative h-screen flex flex-col pt-8"
          >
            <div className="px-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-brand rounded-2xl flex items-center justify-center text-black shadow-xl shadow-brand/20 rotate-3">
                  <Activity size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm font-black italic tracking-tighter leading-none">COLD_CORE</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase font-bold">V1.04_STABLE</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 px-4 overflow-y-auto custom-scrollbar">
              <nav className="space-y-1">
                <SidebarItem icon={LayoutDashboard} label="Mission Control" path="/" active={location.pathname === '/'} />
                <SidebarItem icon={Box} label="Asset Inventory" path="/inventory" active={location.pathname === '/inventory'} />
                <SidebarItem icon={BrainCircuit} label="AI Diagnostics" path="/predictions" active={location.pathname === '/predictions'} />
                <SidebarItem icon={Bell} label="Critical Alerts" path="/alerts" active={location.pathname === '/alerts'} />
                <SidebarItem icon={Database} label="System Reports" path="/reports" active={location.pathname === '/reports'} />
              </nav>
            </div>
            
            <div className="p-4 bg-gradient-to-t from-surface-dark to-transparent">
              <div className="bg-white/5 rounded-3xl border border-white/5 p-5 mb-4 group hover:border-brand/30 transition-all cursor-default">
                <div className="flex justify-between items-start mb-3">
                   <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-bold">Grid_Stability</p>
                   <span className="text-[9px] font-mono text-green-500 font-bold">99.8%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "99.8%" }}
                    className="h-full bg-brand" 
                   />
                </div>
              </div>
              <SidebarItem icon={Settings} label="Core Settings" path="/settings" active={location.pathname === '/settings'} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full -z-0" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-0" />

        {/* Header Bar */}
        <header className="h-16 border-b border-border-subtle flex items-center justify-between px-8 bg-surface-dark/40 backdrop-blur-md relative z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/50 hover:text-white"
            >
              {!isSidebarOpen ? <Menu size={20} /> : <X size={20} />}
            </button>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/5 rounded-full text-white/40">
              WAREHOUSE_ALPHA_NODE
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-black italic text-white/90 uppercase tracking-tight">Dr. Storage Manager</span>
              <span className="text-[9px] font-mono text-brand/60 font-bold uppercase tracking-widest">Access_Level: ADMIN_01</span>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 rounded-2xl border border-brand bg-brand/10 p-1 flex items-center justify-center text-brand font-black text-xs rotate-3 group-hover:rotate-0 transition-transform">
                SM
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-surface-dark rounded-full" />
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/predictions" element={<Predictions />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/alerts" element={<div className="h-96 flex items-center justify-center font-mono text-white/20 uppercase tracking-widest border border-dashed border-white/5 rounded-[40px]">Alert Center - Logs Nominal</div>} />
                <Route path="/settings" element={<div className="h-96 flex items-center justify-center font-mono text-white/20 uppercase tracking-widest border border-dashed border-white/5 rounded-[40px]">Core Settings - Priority Access Required</div>} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

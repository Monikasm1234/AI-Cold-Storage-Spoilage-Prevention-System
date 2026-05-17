import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  ChevronRight,
  TrendingDown,
  Box,
  Thermometer,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Extend jsPDF type for autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const REPORT_TYPES = [
  { id: 'inventory', name: 'Inventory Expiry Log', icon: Box, description: 'Summary of all items expiring in the next 14 days.' },
  { id: 'temperature', name: 'Environmental Audit', icon: Thermometer, description: '24-hour temperature and humidity stability report.' },
  { id: 'power', name: 'Energy Consumption', icon: Zap, description: 'Warehouse power usage and optimization analysis.' },
  { id: 'incidents', name: 'Spoilage Incident Report', icon: TrendingDown, description: 'Logged cases of product spoilage and risk alerts.' },
];

export default function Reports() {
  const [generating, setGenerating] = useState<string | null>(null);

  const generatePDF = async (type: string) => {
    setGenerating(type);
    
    // Simulate data fetch
    await new Promise(resolve => setTimeout(resolve, 1500));

    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 78, 0); // Brand color
    doc.setFontSize(22);
    doc.text('AI COLD STORAGE SYSTEM', 20, 25);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`SYSTEM_REPORT: ${type.toUpperCase()} // DATE: ${new Date().toLocaleDateString()}`, 20, 32);

    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Summary`, 20, 55);

    if (type === 'inventory') {
      doc.autoTable({
        startY: 65,
        head: [['Asset Name', 'Room', 'Entry Date', 'Expiry Date', 'Risk Level']],
        body: [
          ['Milk 1L', 'CR-02', '2026-04-20', '2026-05-02', 'Low'],
          ['Strawberries', 'CR-04', '2026-04-22', '2026-04-28', 'High'],
          ['Beef Tenderloin', 'CR-01', '2026-04-25', '2026-04-26', 'Critical'],
          ['Atlantic Salmon', 'CR-12', '2026-04-24', '2026-05-05', 'Low'],
        ],
        theme: 'striped',
        headStyles: { fillColor: [40, 40, 40] }
      });
    } else {
       doc.setFontSize(10);
       doc.text('System data logs for this period are nominal. No critical anomalies detected.', 20, 70);
    }

    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`AI Cold Storage Prevention System - Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
    }

    doc.save(`cold-storage-${type}-report.pdf`);
    setGenerating(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tighter italic uppercase">Reporting Intelligence</h1>
        <p className="text-white/40 font-mono text-xs mt-1 uppercase">ARCHIVE_SYSTEM: ONLINE // ENCRYPTION: AES-256</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORT_TYPES.map((report, i) => (
          <motion.div 
            key={report.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-surface-elevated/50 border border-white/5 rounded-[32px] p-8 hover:border-brand/30 transition-all flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-white/5 rounded-2xl text-white/30 group-hover:text-brand group-hover:bg-brand/10 transition-all">
                <report.icon size={24} />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                 <Calendar size={12} />
                 Standard Weekly
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2 tracking-tight">{report.name}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-medium mb-8">
                {report.description}
              </p>
            </div>

            <button 
              disabled={generating !== null}
              onClick={() => generatePDF(report.id)}
              className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-brand hover:text-black py-4 rounded-2xl font-black text-xs transition-all uppercase italic disabled:opacity-50"
            >
              {generating === report.id ? (
                 <>
                   <div className="w-4 h-4 border-2 border-surface-dark border-t-transparent rounded-full animate-spin" />
                   Generating Data...
                 </>
              ) : (
                <>
                  <Download size={16} />
                  Download Complete PDF
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Audit History Timeline */}
      <div className="bg-surface-elevated/50 border border-white/5 rounded-[40px] p-8">
        <div className="flex justify-between items-center mb-8">
           <h3 className="font-bold text-lg">Recent Generation History</h3>
           <button className="text-xs font-mono text-white/40 hover:text-white flex items-center gap-2">
             <Filter size={14} /> View All Archives
           </button>
        </div>

        <div className="space-y-4">
          {[
            { name: 'Incidents_Audit_Q2.pdf', user: 'Admin_01', date: '2h ago', size: '2.4MB' },
            { name: 'Warehouse_Stability_Week14.pdf', user: 'Mgr_Storage', date: 'Yesterday', size: '1.2MB' },
            { name: 'Inventory_FIFO_Summary.pdf', user: 'Admin_01', date: '2 days ago', size: '4.8MB' },
          ].map((item, i) => (
             <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-default group">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/20 group-hover:text-brand transition-colors">
                      <FileText size={20} />
                   </div>
                   <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-[10px] font-mono text-white/30 uppercase mt-0.5">{item.user} • {item.date}</p>
                   </div>
                </div>
                <div className="flex items-center gap-6">
                   <span className="text-[10px] font-mono text-white/20">{item.size}</span>
                   <button className="p-2 hover:bg-white/10 rounded-full text-white/30 transition-colors">
                      <ChevronRight size={18} />
                   </button>
                </div>
             </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-mono font-bold text-green-500">
                <CheckCircle2 size={12} />
                ALL ARCHIVE SERVERS SYNCED // NO_DATA_LOSS
            </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Package,
  Calendar,
  Layers,
  MoreVertical
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  entryDate: string;
  expiryDate: string;
  room: string;
  status: 'Fresh' | 'Warning' | 'Critical';
};

const INITIAL_INVENTORY: Product[] = [
  { id: '1', name: 'Fresh Milk 1L', category: 'Dairy', quantity: 120, entryDate: '2026-04-20', expiryDate: '2026-05-02', room: 'CR-02', status: 'Fresh' },
  { id: '2', name: 'Strawberries (Bulk)', category: 'Fruit', quantity: 45, entryDate: '2026-04-22', expiryDate: '2026-04-28', room: 'CR-04', status: 'Warning' },
  { id: '3', name: 'Beef Tenderloin', category: 'Meat', quantity: 20, entryDate: '2026-04-25', expiryDate: '2026-04-26', room: 'CR-01', status: 'Critical' },
  { id: '4', name: 'Atlantic Salmon', category: 'Fish', quantity: 30, entryDate: '2026-04-24', expiryDate: '2026-05-05', room: 'CR-12', status: 'Fresh' },
  { id: '5', name: 'Organic Spinach', category: 'Vegetables', quantity: 80, entryDate: '2026-04-26', expiryDate: '2026-05-01', room: 'CR-03', status: 'Fresh' },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(INITIAL_INVENTORY);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter italic uppercase">Inventory System</h1>
          <p className="text-white/40 font-mono text-xs mt-1">FIFO_MODULE: ENABLED // TOTAL_SKU: {products.length}</p>
        </div>
        <button className="flex items-center gap-2 bg-brand text-black font-black text-xs px-5 py-2.5 rounded-xl hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 uppercase italic">
          <Plus size={16} />
          Append New Asset
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search inventory database..."
            className="w-full bg-surface-elevated/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand/50 transition-all font-mono"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-xs font-bold hover:bg-white/10 transition-colors">
              <Filter size={16} className="text-white/40" />
              Filter
           </button>
           <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-xs font-bold hover:bg-white/10 transition-colors">
              <Layers size={16} className="text-white/40" />
              Categories
           </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredProducts.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-elevated/50 border border-white/5 rounded-3xl p-6 group hover:border-brand/30 transition-all relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-2xl bg-white/5", 
                  product.status === 'Fresh' ? 'text-green-500' : product.status === 'Warning' ? 'text-orange-500' : 'text-red-500')}>
                  <Package size={24} />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/30 hover:text-white">
                    <Edit size={14} />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 rounded-full transition-colors text-white/30 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg leading-tight mb-0.5 group-hover:text-brand transition-colors">{product.name}</h3>
                <p className="text-[10px] font-mono text-brand/60 uppercase tracking-widest font-bold">{product.category}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-mono text-white/40 uppercase">Expiration</p>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-white/30" />
                    <span className="text-xs font-bold">{product.expiryDate}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-mono text-white/40 uppercase">Location</p>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-white/30" />
                    <span className="text-xs font-bold">{product.room}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-2">
                   <div className="w-6 h-6 rounded-full border-2 border-surface-elevated bg-white/10 flex items-center justify-center text-[8px] font-bold">SM</div>
                   <div className="w-6 h-6 rounded-full border-2 border-surface-elevated bg-white/10 flex items-center justify-center text-[8px] font-bold">JB</div>
                </div>
                <div className={cn("px-3 py-1 rounded-full text-[9px] font-mono font-black uppercase italic border shadow-sm",
                  product.status === 'Fresh' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                  product.status === 'Warning' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                  'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse')}>
                  {product.status}
                </div>
              </div>
              
              {/* Background Glow */}
              <div className={cn("absolute -bottom-12 -right-12 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40",
                 product.status === 'Fresh' ? 'bg-green-500' : product.status === 'Warning' ? 'bg-orange-500' : 'bg-red-500')} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

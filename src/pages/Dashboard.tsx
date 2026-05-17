import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  ThermometerSnowflake, 
  Droplets, 
  Zap, 
  TrendingUp, 
  AlertCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock sensor data
const environmentalData = [
  { time: '00:00', temp: 3.1, humidity: 45, power: 12.1 },
  { time: '04:00', temp: 3.4, humidity: 44, power: 12.3 },
  { time: '08:00', temp: 2.8, humidity: 46, power: 13.5 },
  { time: '12:00', temp: 4.1, humidity: 48, power: 15.2 },
  { time: '16:00', temp: 3.5, humidity: 45, power: 14.1 },
  { time: '20:00', temp: 3.2, humidity: 45, power: 12.8 },
];

const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface-elevated/50 border border-white/5 p-5 rounded-2xl hover:border-brand/30 transition-all group"
  >
    <div className="flex justify-between items-start mb-3">
      <div className={cn("p-2 rounded-lg bg-white/5 text-white/40 group-hover:bg-brand/10 group-hover:text-brand transition-colors")}>
        <Icon size={18} />
      </div>
      {trend && (
        <span className={cn("text-[10px] font-mono px-2 py-0.5 rounded-full border", 
          trend.startsWith('+') ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20')}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">{label}</p>
    <p className={cn("text-2xl font-bold font-mono tracking-tighter", color || "text-white")}>{value}</p>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter italic">DASHBOARD</h1>
          <div className="flex items-center gap-2 text-white/40 font-mono text-xs mt-1">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             NODE_CONNECTED: WAREHOUSE_ALPHA // LATENCY: 24ms
          </div>
        </div>
        <div className="flex gap-2">
           <button className="bg-brand text-black font-black text-xs px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors uppercase italic shadow-lg shadow-brand/20">
             Run AI Diagnostics
           </button>
           <button className="bg-white/5 border border-white/10 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-white/10 transition-colors uppercase italic">
             Export Data
           </button>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Live Temperature" value="2.84°C" trend="-0.12%" icon={ThermometerSnowflake} />
        <StatCard label="Air Humidity" value="44.2%" trend="+2.15%" icon={Droplets} />
        <StatCard label="Energy Load" value="14.2kW" trend="-5.40%" icon={Zap} />
        <StatCard label="Freshness Index" value="94/100" icon={TrendingUp} color="text-brand" />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-surface-elevated/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/50 to-transparent opacity-50" />
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-bold text-lg tracking-tight">Environmental Dynamics</h3>
              <p className="text-xs text-white/40 font-mono mt-0.5">24-hour sensor telemetry overlay</p>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/5">
              {['Temp', 'Hum', 'Energy'].map((tab) => (
                <button key={tab} className={cn("px-3 py-1 text-[10px] font-mono rounded-lg transition-all", tab === 'Temp' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white')}>
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={environmentalData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4e00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff4e00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  fontFamily="JetBrains Mono"
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  fontFamily="JetBrains Mono"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151619', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#ff4e00" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTemp)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel: Inventory Alerts */}
        <div className="bg-surface-elevated/50 border border-white/5 rounded-3xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <h3 className="font-bold text-sm tracking-widest uppercase text-white/70">Risk Matrix</h3>
            <span className="text-[10px] font-mono bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded italic">4 Critical Alerts</span>
          </div>

          <div className="space-y-4 flex-1">
            {[
              { product: 'Fresh Strawberries', status: 'Spoiling Soon', risk: '92%', room: 'CR-04', color: 'bg-red-500' },
              { product: 'Whole Milk (3.5%)', status: 'Temp Spike', risk: 'High', room: 'CR-02', color: 'bg-orange-500' },
              { product: 'Atlantic Salmon', status: 'Asset Expiry', risk: 'Medium', room: 'CR-12', color: 'bg-yellow-500' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className="group flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10"
              >
                <div className={cn("w-1 rounded-full", item.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-bold text-xs truncate">{item.product}</p>
                    <span className="text-[9px] font-mono text-white/30">{item.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] text-white/40">{item.status}</p>
                    <span className="text-white/20">•</span>
                    <p className="text-[10px] font-mono font-bold text-white/60">RISK: {item.risk}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 self-center" />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-white/30 uppercase">Power Grid Stability</span>
                <span className="text-[10px] font-mono text-green-500 italic">98.2%</span>
             </div>
             <div className="grid grid-cols-20 gap-1">
               {Array.from({length: 40}).map((_, i) => (
                 <div key={i} className={cn("h-4 rounded-sm", i === 32 ? 'bg-orange-500/50' : 'bg-green-500/20 hover:bg-green-500/40 transition-colors')} />
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

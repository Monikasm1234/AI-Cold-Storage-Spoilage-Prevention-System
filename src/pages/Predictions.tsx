import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrainCircuit, 
  Camera, 
  Upload, 
  Calculator, 
  Sparkles, 
  Thermometer, 
  Droplets, 
  Clock,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  Search
} from 'lucide-react';
import { predictShelfLife, analyzeProductImage } from '../services/gemini';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Predictions() {
  const [loading, setLoading] = useState(false);
  const [imageResult, setImageResult] = useState<any>(null);
  const [shelfLifeResult, setShelfLifeResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Shelf Life Calculator Form
  const [formData, setFormData] = useState({
    productType: 'Milk',
    temperature: 4,
    humidity: 45,
    ageDays: 2
  });

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const result = await predictShelfLife(formData);
      setShelfLifeResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        processImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setLoading(true);
    try {
      const base64Data = base64.split(',')[1];
      const result = await analyzeProductImage(base64Data);
      setImageResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-brand text-[10px] font-black italic tracking-widest uppercase mb-4">
          <Sparkles size={12} />
          GenAI Predictive Engine
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter italic uppercase">AI Diagnostic Suite</h1>
        <p className="text-white/50 max-w-xl mx-auto text-sm font-mono leading-relaxed uppercase">
          Leveraging Gemini 1.5 Flash for high-fidelity shelf-life estimation and computer-vision based spoilage detection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Module 1: Shelf Life Calculator */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface-elevated/50 border border-white/5 rounded-[40px] p-8 space-y-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-brand rounded-2xl text-black">
              <Calculator size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl tracking-tight">Preservation Estimator</h3>
              <p className="text-xs text-white/40 font-mono">Statistical remaining freshness</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase ml-2">Product Type</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-brand/40"
                value={formData.productType}
                onChange={(e) => setFormData({...formData, productType: e.target.value})}
              >
                <option value="Milk">Milk / Dairy</option>
                <option value="Strawberries">Strawberries / Berries</option>
                <option value="Steak">Meat (Steak)</option>
                <option value="Salmon">Fish (Salmon)</option>
                <option value="Spinach">Leafy Greens</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase ml-2">Current Age (Days)</label>
              <input 
                type="number" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-brand/40"
                value={formData.ageDays}
                onChange={(e) => setFormData({...formData, ageDays: Number(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase ml-2">Temp (°C)</label>
              <div className="relative">
                <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  type="number" 
                  step="0.5"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand/40"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase ml-2">Humidity (%)</label>
              <div className="relative">
                <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  type="number" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand/40"
                  value={formData.humidity}
                  onChange={(e) => setFormData({...formData, humidity: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            onClick={handleCalculate}
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-brand transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
            CALCULATE PRESERVATION SCORE
          </button>

          <AnimatePresence>
            {shelfLifeResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-brand/5 border border-brand/20 rounded-3xl space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-brand font-bold">PREDICTION_RESULT</span>
                  <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase italic", 
                    shelfLifeResult.riskLevel === 'Low' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500')}>
                    {shelfLifeResult.riskLevel} Risk
                  </div>
                </div>
                <div className="flex items-end gap-3">
                   <h4 className="text-5xl font-mono font-black tracking-tighter">{shelfLifeResult.remainingDays}</h4>
                   <p className="text-xs font-bold text-white/50 mb-1.5 uppercase tracking-widest">Days Remaining</p>
                </div>
                <p className="text-sm border-l-2 border-brand/30 pl-4 py-1 italic text-white/80 leading-relaxed">
                  "{shelfLifeResult.recommendation}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Module 2: Computer Vision Rot Detection */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface-elevated/50 border border-white/5 rounded-[40px] p-8 space-y-6 flex flex-col relative"
        >
           <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-2xl text-white">
              <Camera size={24} />
            </div>
            <div>
              <h3 className="font-bold text-xl tracking-tight">Vision Inspect</h3>
              <p className="text-xs text-white/40 font-mono">Visual rot & bruise identification</p>
            </div>
          </div>

          <div 
            className="flex-1 min-h-[300px] border-2 border-dashed border-white/10 rounded-[32px] overflow-hidden group relative transition-colors hover:border-brand/40"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? (
              <>
                <img src={selectedImage} alt="Analysis Target" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-xs font-bold flex items-center gap-2"><Upload size={14} /> REPLACE PHOTOGRAPH</p>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-brand group-hover:scale-110 transition-all">
                    <Camera size={32} />
                  </div>
                  <div>
                    <p className="font-bold">Scan Product Surface</p>
                    <p className="text-xs text-white/40 font-mono mt-1 uppercase">Supports JPEG, PNG // MAX_FILE_SIZE: 10MB</p>
                  </div>
              </div>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
            />
          </div>

          <AnimatePresence>
            {imageResult && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-12 left-12 right-12 bg-surface-dark/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
              >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-black text-lg uppercase italic leading-none">{imageResult.product}</h4>
                      <p className="text-[10px] font-mono text-white/40 mt-1 uppercase tracking-widest">Neural Observation v2.4</p>
                    </div>
                    <div className={cn("px-3 py-1 rounded-full text-[10px] font-black", 
                       imageResult.condition === 'Fresh' ? 'bg-green-500 text-black' : 'bg-red-500 text-white')}>
                      {imageResult.condition}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest">
                         <span>Viability Score</span>
                         <span>{imageResult.score}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${imageResult.score}%` }}
                          transition={{ duration: 1 }}
                          className={cn("h-full", imageResult.score > 70 ? 'bg-green-500' : imageResult.score > 40 ? 'bg-orange-500' : 'bg-red-500')} 
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">"{imageResult.observations}"</p>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
           
          {loading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-[40px] flex flex-col items-center justify-center space-y-4 z-50">
               <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
               <p className="text-xs font-mono font-bold tracking-widest text-brand animate-pulse uppercase">Neural Processing...</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Advanced Features (Row 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-elevated/50 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group hover:bg-brand/10 hover:text-brand transition-colors">
                  <Clock size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-mono text-white/40 uppercase">Auto Cooling Suggestion</p>
                 <p className="font-bold text-sm">SET_UNIT_04: 2.2°C</p>
              </div>
          </div>
           <div className="bg-surface-elevated/50 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group hover:bg-brand/10 hover:text-brand transition-colors">
                  <CheckCircle2 size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-mono text-white/40 uppercase">Anomaly Detection</p>
                 <p className="font-bold text-sm text-green-500">SYSTEM_NOMINAL</p>
              </div>
          </div>
           <div className="bg-surface-elevated/50 border border-white/5 p-6 rounded-3xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group hover:bg-brand/10 hover:text-brand transition-colors">
                  <AlertOctagon size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-mono text-white/40 uppercase">Power Surge Guard</p>
                 <p className="font-bold text-sm">ACTIVE // PROTECTED</p>
              </div>
          </div>
      </div>
    </div>
  );
}

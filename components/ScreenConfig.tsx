import React, { useState } from 'react';
import { Settings, Type, Music, Zap, Video } from 'lucide-react';
import { Button } from './Button';
import { VideoConfig } from '../types';

interface ScreenConfigProps {
  onStartProcessing: (config: VideoConfig) => void;
  onBack: () => void;
}

export const ScreenConfig: React.FC<ScreenConfigProps> = ({ onStartProcessing, onBack }) => {
  const [quality, setQuality] = useState<'FAST' | 'BALANCED' | 'HIGH'>('BALANCED');
  
  // Subtitles
  const [enableSubtitles, setEnableSubtitles] = useState(true);
  const [subtitleSize, setSubtitleSize] = useState<'SMALL' | 'MEDIUM' | 'LARGE'>('MEDIUM');
  const [subtitleColor, setSubtitleColor] = useState<'YELLOW' | 'WHITE'>('YELLOW');
  
  // Music
  const [enableMusic, setEnableMusic] = useState(true);
  const [musicVolume, setMusicVolume] = useState<'LOW' | 'MEDIUM'>('LOW');

  const handleStart = () => {
    onStartProcessing({
      quality,
      subtitles: enableSubtitles,
      subtitleFont: 'Arial', // Default
      subtitleSize,
      subtitleColor,
      backgroundMusic: enableMusic,
      musicVolume,
    });
  };

  return (
    <div className="flex flex-col h-full animate-fade-in overflow-y-auto pr-2 custom-scrollbar">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Como será seu vídeo?</h2>
        <p className="text-slate-400 text-sm">Configurações simples para resultado rápido.</p>
      </div>

      <div className="space-y-6 mb-6">
        {/* Quality Section */}
        <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center mb-4 text-indigo-400 font-semibold">
            <Video className="w-5 h-5 mr-2" />
            Qualidade do Vídeo
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'FAST', label: 'Rápido', icon: Zap },
              { id: 'BALANCED', label: 'Equilibrado', icon: Settings },
              { id: 'HIGH', label: 'Alta Qualidade', icon: Video },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setQuality(opt.id as any)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                  quality === opt.id 
                    ? 'border-indigo-500 bg-indigo-500/20 text-white' 
                    : 'border-slate-700 text-slate-500 hover:border-slate-600'
                }`}
              >
                <opt.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Subtitles Section */}
        <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center text-yellow-400 font-semibold">
              <Type className="w-5 h-5 mr-2" />
              Legendas Automáticas
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={enableSubtitles} onChange={(e) => setEnableSubtitles(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {enableSubtitles && (
            <div className="space-y-4 animate-fade-in pl-2 border-l-2 border-slate-700 ml-2">
              <div>
                <span className="block text-xs text-slate-400 mb-2 uppercase tracking-wide">Tamanho</span>
                <div className="flex gap-2">
                   {['SMALL', 'MEDIUM', 'LARGE'].map((size) => (
                     <button 
                      key={size}
                      onClick={() => setSubtitleSize(size as any)}
                      className={`px-3 py-1 rounded text-sm ${subtitleSize === size ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                     >
                       {size === 'SMALL' ? 'Peq.' : size === 'MEDIUM' ? 'Médio' : 'Grande'}
                     </button>
                   ))}
                </div>
              </div>
              <div>
                <span className="block text-xs text-slate-400 mb-2 uppercase tracking-wide">Cor</span>
                <div className="flex gap-3">
                   <button onClick={() => setSubtitleColor('YELLOW')} className={`w-8 h-8 rounded-full bg-yellow-400 border-2 ${subtitleColor === 'YELLOW' ? 'border-white scale-110' : 'border-transparent'}`}></button>
                   <button onClick={() => setSubtitleColor('WHITE')} className={`w-8 h-8 rounded-full bg-white border-2 ${subtitleColor === 'WHITE' ? 'border-indigo-500 scale-110' : 'border-transparent'}`}></button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Music Section */}
        <section className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center text-pink-400 font-semibold">
              <Music className="w-5 h-5 mr-2" />
              Música de Fundo
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={enableMusic} onChange={(e) => setEnableMusic(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          {enableMusic && (
             <div className="flex items-center gap-4 mt-4 pl-2 border-l-2 border-slate-700 ml-2">
                <span className="text-sm text-slate-400">Volume:</span>
                <div className="flex gap-2">
                  <button onClick={() => setMusicVolume('LOW')} className={`px-3 py-1 text-xs rounded ${musicVolume === 'LOW' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Baixo</button>
                  <button onClick={() => setMusicVolume('MEDIUM')} className={`px-3 py-1 text-xs rounded ${musicVolume === 'MEDIUM' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>Médio</button>
                </div>
             </div>
          )}
        </section>
      </div>

      <div className="mt-auto flex gap-4 pt-4 border-t border-slate-800">
        <Button variant="secondary" onClick={onBack} className="w-1/3">
          Voltar
        </Button>
        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleStart}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-none"
        >
          Iniciar Criação
        </Button>
      </div>
    </div>
  );
};
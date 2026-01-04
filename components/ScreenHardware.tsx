import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Monitor, Gauge } from 'lucide-react';
import { Button } from './Button';
import { PCProfile } from '../types';

interface ScreenHardwareProps {
  onConfirm: (profile: PCProfile) => void;
}

export const ScreenHardware: React.FC<ScreenHardwareProps> = ({ onConfirm }) => {
  const [scanning, setScanning] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<PCProfile>(PCProfile.MEDIUM);

  useEffect(() => {
    // Simulate hardware scan
    const timer = setTimeout(() => {
      setScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const profiles = [
    {
      id: PCProfile.LOW,
      name: 'PC Básico',
      desc: 'Ideal para vídeos 720p',
      icon: <Monitor className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    {
      id: PCProfile.MEDIUM,
      name: 'PC Médio',
      desc: 'Recomendado para 1080p',
      icon: <Cpu className="w-6 h-6" />,
      color: 'text-indigo-400'
    },
    {
      id: PCProfile.HIGH,
      name: 'PC Gamer/Forte',
      desc: 'Alta performance 4K',
      icon: <Gauge className="w-6 h-6" />,
      color: 'text-purple-400'
    },
  ];

  if (scanning) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-slate-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-24 h-24 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
          <Cpu className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-400 w-10 h-10" />
        </div>
        <h2 className="text-xl font-semibold text-white">Analisando seu computador...</h2>
        <p className="text-slate-400">Verificando processador e placa de vídeo</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in p-2">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 bg-green-500/10 rounded-full mb-3">
          <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
          <span className="text-green-500 font-medium">Análise Concluída</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Seu Hardware foi Detectado</h2>
        <p className="text-slate-400">Com base na análise, sugerimos o perfil abaixo.</p>
      </div>

      <div className="space-y-3 mb-8">
        {profiles.map((profile) => (
          <div 
            key={profile.id}
            onClick={() => setSelectedProfile(profile.id)}
            className={`
              relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center
              ${selectedProfile === profile.id 
                ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10' 
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}
            `}
          >
            <div className={`p-3 rounded-lg bg-slate-800 mr-4 ${profile.color}`}>
              {profile.icon}
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold ${selectedProfile === profile.id ? 'text-white' : 'text-slate-300'}`}>
                {profile.name}
              </h3>
              <p className="text-sm text-slate-500">{profile.desc}</p>
            </div>
            {selectedProfile === profile.id && (
              <div className="absolute top-4 right-4">
                 <div className="w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
              </div>
            )}
            {profile.id === PCProfile.MEDIUM && (
              <div className="absolute -top-3 right-8 bg-green-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                Recomendado
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <Button 
          fullWidth 
          size="lg" 
          onClick={() => onConfirm(selectedProfile)}
        >
          Confirmar Perfil
        </Button>
      </div>
    </div>
  );
};
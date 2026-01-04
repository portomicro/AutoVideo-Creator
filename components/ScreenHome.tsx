import React from 'react';
import { Video, Layers, Settings, HelpCircle, Play } from 'lucide-react';
import { Button } from './Button';

interface ScreenHomeProps {
  onStart: () => void;
  onSettings: () => void;
  onHelp: () => void;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({ onStart, onSettings, onHelp }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/20">
          <Video className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">AutoVideo Studio</h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Transforme imagens e áudio em vídeos profissionais para YouTube em segundos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <Button 
          variant="primary" 
          size="xl" 
          fullWidth 
          onClick={onStart}
          icon={<Play className="w-6 h-6 fill-current" />}
        >
          Criar Novo Vídeo
        </Button>
        
        <Button 
          variant="secondary" 
          size="lg" 
          fullWidth 
          icon={<Layers className="w-5 h-5" />}
          onClick={() => alert("Funcionalidade 'Lote' disponível na versão PRO.")}
        >
          Processar em Lote
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="secondary" 
            size="md" 
            fullWidth 
            onClick={onSettings}
            icon={<Settings className="w-4 h-4" />}
          >
            Ajustes
          </Button>
          <Button 
            variant="outline" 
            size="md" 
            fullWidth 
            onClick={onHelp}
            icon={<HelpCircle className="w-4 h-4" />}
          >
            Ajuda
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-slate-600 mt-8">Versão 1.0.0 (Local Offline)</p>
    </div>
  );
};
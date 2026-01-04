import React from 'react';
import { Check, FolderOpen, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

interface ScreenSuccessProps {
  onRestart: () => void;
  folderPath: string;
}

export const ScreenSuccess: React.FC<ScreenSuccessProps> = ({ onRestart, folderPath }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-scale-in">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30">
        <Check className="w-12 h-12 text-white" strokeWidth={3} />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-2">Sucesso!</h2>
      <p className="text-slate-400 mb-8 text-center max-w-xs">
        Seu vídeo foi criado e salvo na pasta selecionada.
      </p>

      <div className="w-full max-w-sm space-y-3">
        <Button 
          variant="primary" 
          fullWidth 
          size="lg"
          icon={<FolderOpen className="w-5 h-5" />}
          onClick={() => alert(`Abrindo pasta: ${folderPath}`)} // Mock action
          className="bg-green-600 hover:bg-green-500 focus:ring-green-500"
        >
          Abrir Pasta do Vídeo
        </Button>
        
        <Button 
          variant="secondary" 
          fullWidth 
          icon={<RefreshCcw className="w-4 h-4" />}
          onClick={onRestart}
        >
          Criar Novo Vídeo
        </Button>
      </div>
    </div>
  );
};
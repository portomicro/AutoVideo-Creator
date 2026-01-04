import React, { useState } from 'react';
import { FolderOpen, Image, Mic, Film, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { FolderStatus } from '../types';

interface ScreenFolderProps {
  onContinue: (status: FolderStatus) => void;
  onBack: () => void;
}

export const ScreenFolder: React.FC<ScreenFolderProps> = ({ onContinue, onBack }) => {
  const [folderPath, setFolderPath] = useState<string>("");
  const [status, setStatus] = useState<FolderStatus | null>(null);

  // Mock folder selection logic
  const handleSelectFolder = () => {
    // In a real app, this would open a dialog. Here we simulate picking a valid folder.
    const mockPath = "C:\\Users\\Creator\\Videos\\Project01";
    setFolderPath(mockPath);
    
    // Simulate scanning folder content
    setStatus({
      path: mockPath,
      hasImages: true,
      hasAudio: true,
      hasOverlay: false,
      isValid: true
    });
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Onde estão seus arquivos?</h2>
        <p className="text-slate-400 text-sm">Selecione a pasta com o material do vídeo.</p>
      </div>

      {/* Folder Input Area */}
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-6">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg flex items-center px-4 text-slate-400 text-sm truncate">
            {folderPath || "Nenhuma pasta selecionada..."}
          </div>
          <Button variant="secondary" onClick={handleSelectFolder} icon={<FolderOpen className="w-4 h-4"/>}>
            Escolher
          </Button>
        </div>

        {/* Requirements List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="flex items-center text-slate-300">
              <Image className="w-5 h-5 mr-3 text-blue-400" />
              <span>Imagens (JPG, PNG)</span>
            </div>
            {status ? (
              status.hasImages ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : <span className="text-slate-600 text-xs">Aguardando...</span>}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
            <div className="flex items-center text-slate-300">
              <Mic className="w-5 h-5 mr-3 text-pink-400" />
              <span>Áudio/Narração (MP3, WAV)</span>
            </div>
            {status ? (
              status.hasAudio ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : <span className="text-slate-600 text-xs">Aguardando...</span>}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 opacity-70">
            <div className="flex items-center text-slate-400">
              <Film className="w-5 h-5 mr-3 text-purple-400" />
              <span>Overlay (Opcional)</span>
            </div>
            {status && (
               status.hasOverlay ? <CheckCircle className="w-5 h-5 text-green-500" /> : <span className="text-xs text-slate-500">Não detectado</span>
            )}
          </div>
        </div>

        {status && !status.isValid && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
            Faltam arquivos essenciais na pasta!
          </div>
        )}
      </div>

      <div className="mt-auto flex gap-4">
        <Button variant="secondary" onClick={onBack} className="w-1/3">
          Voltar
        </Button>
        <Button 
          variant="primary" 
          fullWidth 
          disabled={!status?.isValid}
          onClick={() => status && onContinue(status)}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
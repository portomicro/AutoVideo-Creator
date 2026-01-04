import React from 'react';
import { ArrowLeft, HelpCircle, FileQuestion, Youtube, Mail } from 'lucide-react';
import { Button } from './Button';

interface ScreenHelpProps {
  onBack: () => void;
}

export const ScreenHelp: React.FC<ScreenHelpProps> = ({ onBack }) => {
  const faqItems = [
    {
      q: "Quais formatos são aceitos?",
      a: "Imagens JPG e PNG. Áudio MP3 e WAV. O software ajusta automaticamente a resolução."
    },
    {
      q: "Preciso de internet?",
      a: "Não para a criação básica. A internet é necessária apenas para baixar músicas de fundo adicionais ou atualizar o software."
    },
    {
      q: "Como funciona o Overlay?",
      a: "Se você adicionar um arquivo de vídeo 'overlay.mp4' na pasta, ele será aplicado sobre as imagens com 30% de opacidade."
    }
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in">
       <div className="flex items-center mb-6">
        <Button variant="secondary" size="sm" onClick={onBack} className="mr-4 px-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-white">Central de Ajuda</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="grid gap-4 mb-8">
            {faqItems.map((item, idx) => (
                <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
                    <div className="flex items-start mb-2">
                        <HelpCircle className="w-5 h-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                        <h3 className="font-semibold text-white">{item.q}</h3>
                    </div>
                    <p className="text-slate-400 text-sm ml-7 leading-relaxed">{item.a}</p>
                </div>
            ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800 p-6 rounded-2xl border border-indigo-500/30 mb-4">
            <h3 className="font-bold text-white mb-4 flex items-center">
                <Youtube className="w-5 h-5 mr-2 text-red-500" />
                Tutoriais em Vídeo
            </h3>
            <div className="space-y-3">
                <button className="w-full text-left p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition flex items-center justify-between group">
                    <span className="text-slate-300 text-sm group-hover:text-white">Como criar seu primeiro vídeo</span>
                    <PlayIcon />
                </button>
                <button className="w-full text-left p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition flex items-center justify-between group">
                    <span className="text-slate-300 text-sm group-hover:text-white">Configurando legendas perfeitas</span>
                    <PlayIcon />
                </button>
            </div>
        </div>

        <div className="flex items-center justify-center p-4 border-t border-slate-800">
            <Mail className="w-4 h-4 text-slate-500 mr-2" />
            <span className="text-slate-500 text-sm">suporte@autovideo.com</span>
        </div>
      </div>
    </div>
  );
};

const PlayIcon = () => (
    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
        <svg className="w-3 h-3 text-white fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
    </div>
);
import React, { useEffect, useState } from 'react';
import { Loader2, Check, XCircle } from 'lucide-react';
import { Button } from './Button';

interface ScreenProcessingProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const ScreenProcessing: React.FC<ScreenProcessingProps> = ({ onComplete, onCancel }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    "Analisando imagens...",
    "Otimizando áudio e narração...",
    "Gerando legendas automáticas...",
    "Renderizando vídeo final...",
  ];

  useEffect(() => {
    // Simulate processing logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.8; // Slow increment
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update text steps based on progress
    if (progress < 25) setCurrentStepIndex(0);
    else if (progress < 50) setCurrentStepIndex(1);
    else if (progress < 80) setCurrentStepIndex(2);
    else setCurrentStepIndex(3);

    if (progress === 100) {
        // Slight delay before completing
        setTimeout(onComplete, 800);
    }
  }, [progress, onComplete]);

  return (
    <div className="flex flex-col h-full justify-center items-center max-w-lg mx-auto w-full">
      <div className="w-full text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2 animate-pulse">Criando seu vídeo...</h2>
        <p className="text-slate-400">Por favor, não feche o aplicativo.</p>
      </div>

      {/* Big Progress Bar */}
      <div className="w-full h-4 bg-slate-800 rounded-full mb-8 overflow-hidden relative shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-200 ease-out relative"
          style={{ width: `${progress}%` }}
        >
            <div className="absolute top-0 right-0 bottom-0 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"></div>
        </div>
      </div>

      {/* Steps Checklist */}
      <div className="w-full space-y-4 mb-10">
        {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
                <div key={idx} className={`flex items-center transition-all duration-300 ${isPending ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}>
                    <div className="mr-4">
                        {isCompleted ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        ) : isCurrent ? (
                             <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                        ) : (
                            <div className="w-6 h-6 border-2 border-slate-700 rounded-full"></div>
                        )}
                    </div>
                    <span className={`font-medium ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                        {step}
                    </span>
                </div>
            )
        })}
      </div>

      <div className="w-full text-center text-sm text-slate-500 mb-8 font-mono">
        Tempo restante estimado: {Math.max(0, Math.ceil((100 - progress) / 5))}s
      </div>

      <Button variant="danger" onClick={onCancel} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border-transparent">
         Cancelar Operação
      </Button>
    </div>
  );
};
import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { id: AppStep.HARDWARE_CHECK, label: 'Hardware' },
    { id: AppStep.FOLDER_SELECT, label: 'Arquivos' },
    { id: AppStep.CONFIG, label: 'Opções' },
    { id: AppStep.PROCESSING, label: 'Criando' },
  ];

  // Helper to determine if a step is active or completed
  const getStepStatus = (stepId: AppStep) => {
    const order = [
      AppStep.HOME,
      AppStep.HARDWARE_CHECK,
      AppStep.FOLDER_SELECT,
      AppStep.CONFIG,
      AppStep.PROCESSING,
      AppStep.SUCCESS
    ];
    
    // Auxiliary screens don't track progress
    if (currentStep === AppStep.SETTINGS || currentStep === AppStep.HELP) return 'pending';

    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  // Hide indicator on Home, Success, Settings, and Help
  if (
    currentStep === AppStep.HOME || 
    currentStep === AppStep.SUCCESS || 
    currentStep === AppStep.SETTINGS || 
    currentStep === AppStep.HELP
  ) return null;

  return (
    <div className="w-full flex items-center justify-between px-8 py-6 mb-4">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        return (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
              status === 'completed' ? 'bg-indigo-600 border-indigo-600 text-white' :
              status === 'active' ? 'bg-slate-800 border-indigo-500 text-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' :
              'bg-slate-800 border-slate-600 text-slate-600'
            }`}>
              {status === 'completed' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-xs font-bold">{index + 1}</span>
              )}
            </div>
            <span className={`text-xs mt-2 font-medium ${
              status === 'active' ? 'text-indigo-400' : 
              status === 'completed' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
      
      {/* Connector Line */}
      <div className="absolute left-0 w-full px-12 top-[3.25rem]"> 
        {/* This positioning is tricky without fixed widths, simplified for this demo */}
        <div className="h-0.5 w-full bg-slate-800 -z-0"></div>
      </div>
    </div>
  );
};
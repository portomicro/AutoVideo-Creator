import React, { useState } from 'react';
import { AppStep, FolderStatus, PCProfile, VideoConfig } from './types';
import { StepIndicator } from './components/StepIndicator';
import { ScreenHome } from './components/ScreenHome';
import { ScreenHardware } from './components/ScreenHardware';
import { ScreenFolder } from './components/ScreenFolder';
import { ScreenConfig } from './components/ScreenConfig';
import { ScreenProcessing } from './components/ScreenProcessing';
import { ScreenSuccess } from './components/ScreenSuccess';
import { ScreenSettings } from './components/ScreenSettings';
import { ScreenHelp } from './components/ScreenHelp';

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.HOME);
  
  // State Store
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profile, setProfile] = useState<PCProfile | null>(null);
  const [folderData, setFolderData] = useState<FolderStatus | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [config, setConfig] = useState<VideoConfig | null>(null);

  // Navigation Handlers
  const goHome = () => setCurrentStep(AppStep.HOME);
  const goToSettings = () => setCurrentStep(AppStep.SETTINGS);
  const goToHelp = () => setCurrentStep(AppStep.HELP);
  
  const startFlow = () => setCurrentStep(AppStep.HARDWARE_CHECK);
  
  const handleHardwareConfirm = (selectedProfile: PCProfile) => {
    setProfile(selectedProfile);
    setCurrentStep(AppStep.FOLDER_SELECT);
  };

  const handleFolderContinue = (status: FolderStatus) => {
    setFolderData(status);
    setCurrentStep(AppStep.CONFIG);
  };

  const handleFolderBack = () => {
    setCurrentStep(AppStep.HARDWARE_CHECK);
  };

  const handleConfigStart = (videoConfig: VideoConfig) => {
    setConfig(videoConfig);
    setCurrentStep(AppStep.PROCESSING);
  };

  const handleConfigBack = () => {
    setCurrentStep(AppStep.FOLDER_SELECT);
  };

  const handleProcessingComplete = () => {
    setCurrentStep(AppStep.SUCCESS);
  };

  const handleProcessingCancel = () => {
    if (window.confirm("Tem certeza que deseja cancelar?")) {
      goHome();
    }
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentStep) {
      case AppStep.HOME:
        return <ScreenHome onStart={startFlow} onSettings={goToSettings} onHelp={goToHelp} />;
      case AppStep.SETTINGS:
        return <ScreenSettings onBack={goHome} />;
      case AppStep.HELP:
        return <ScreenHelp onBack={goHome} />;
      case AppStep.HARDWARE_CHECK:
        return <ScreenHardware onConfirm={handleHardwareConfirm} />;
      case AppStep.FOLDER_SELECT:
        return <ScreenFolder onContinue={handleFolderContinue} onBack={handleFolderBack} />;
      case AppStep.CONFIG:
        return <ScreenConfig onStartProcessing={handleConfigStart} onBack={handleConfigBack} />;
      case AppStep.PROCESSING:
        return <ScreenProcessing onComplete={handleProcessingComplete} onCancel={handleProcessingCancel} />;
      case AppStep.SUCCESS:
        return <ScreenSuccess onRestart={goHome} folderPath={folderData?.path || ""} />;
      default:
        return <ScreenHome onStart={startFlow} onSettings={goToSettings} onHelp={goToHelp} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Desktop App Window Container */}
      <div className="w-full max-w-2xl h-[700px] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col relative">
        
        {/* Fake Window Title Bar */}
        <div className="h-8 bg-slate-950 flex items-center justify-between px-4 select-none border-b border-slate-800">
           <span className="text-xs font-medium text-slate-500">AutoVideo Creator - v1.0</span>
           <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-slate-700"></div>
             <div className="w-3 h-3 rounded-full bg-slate-700"></div>
             <div className="w-3 h-3 rounded-full bg-red-900/50 hover:bg-red-500 cursor-pointer"></div>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/0 to-slate-900/0 pointer-events-none"></div>
          
          <StepIndicator currentStep={currentStep} />
          
          <div className="flex-1 relative z-10 overflow-hidden h-full">
            {renderScreen()}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
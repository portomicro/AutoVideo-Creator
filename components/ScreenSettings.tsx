import React, { useState } from 'react';
import { ArrowLeft, Monitor, Moon, Globe, Shield, RefreshCcw } from 'lucide-react';
import { Button } from './Button';

interface ScreenSettingsProps {
  onBack: () => void;
}

export const ScreenSettings: React.FC<ScreenSettingsProps> = ({ onBack }) => {
  const [theme, setTheme] = useState('DARK');
  const [lang, setLang] = useState('PT-BR');
  const [autoUpdate, setAutoUpdate] = useState(true);

  const SettingItem = ({ icon: Icon, title, children }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
      <div className="flex items-center text-slate-300">
        <div className="p-2 bg-slate-800 rounded-lg mr-3">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex items-center mb-6">
        <Button variant="secondary" size="sm" onClick={onBack} className="mr-4 px-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-white">Ajustes</h2>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
        <SettingItem icon={Moon} title="Tema da Interface">
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            <button 
              onClick={() => setTheme('DARK')}
              className={`px-3 py-1 text-xs rounded-md transition-all ${theme === 'DARK' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Escuro
            </button>
            <button 
              onClick={() => setTheme('LIGHT')}
              className={`px-3 py-1 text-xs rounded-md transition-all ${theme === 'LIGHT' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Claro
            </button>
          </div>
        </SettingItem>

        <SettingItem icon={Globe} title="Idioma">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2"
          >
            <option value="PT-BR">Português (BR)</option>
            <option value="EN-US">English (US)</option>
            <option value="ES">Español</option>
          </select>
        </SettingItem>

        <SettingItem icon={Shield} title="Permissões">
          <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-1 rounded">
            Administrador
          </span>
        </SettingItem>
        
        <SettingItem icon={RefreshCcw} title="Atualização Automática">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
        </SettingItem>

        <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-dashed border-slate-700 text-center">
            <Monitor className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Versão da Build: 2.4.15-alpha</p>
            <p className="text-slate-600 text-xs mt-1">ID do Hardware: HW-8842-X</p>
        </div>
      </div>
    </div>
  );
};
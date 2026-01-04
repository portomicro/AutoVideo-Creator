export enum AppStep {
  HOME = 'HOME',
  SETTINGS = 'SETTINGS',
  HELP = 'HELP',
  HARDWARE_CHECK = 'HARDWARE_CHECK',
  FOLDER_SELECT = 'FOLDER_SELECT',
  CONFIG = 'CONFIG',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
}

export enum PCProfile {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface VideoConfig {
  quality: 'FAST' | 'BALANCED' | 'HIGH';
  subtitles: boolean;
  subtitleFont: string;
  subtitleSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  subtitleColor: 'YELLOW' | 'WHITE';
  backgroundMusic: boolean;
  musicVolume: 'LOW' | 'MEDIUM';
}

export interface FolderStatus {
  path: string;
  hasImages: boolean;
  hasAudio: boolean;
  hasOverlay: boolean;
  isValid: boolean;
}
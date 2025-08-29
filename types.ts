export type AspectRatio = "16:9" | "9:16" | "1:1" | "4:3" | "3:4";
export type SafetyPolicy = "ALLOW_ALL" | "ALLOW_ADULT" | "DISALLOW_PEOPLE";
export type Resolution = "1080p" | "720p";

export interface VideoOptions {
  model: string;
  aspectRatio: AspectRatio;
  negativePrompt: string;
  safetyPolicy: SafetyPolicy;
  resolution: Resolution;
}

export type LoadingStatus = 'idle' | 'validating' | 'generating' | 'polling' | 'success' | 'error';

export interface LoadingState {
  status: LoadingStatus;
  message: string;
}

export type ApiKeyStatus = 'unchecked' | 'valid' | 'invalid';

import React from 'react';
import type { VideoOptions, AspectRatio, SafetyPolicy, Resolution } from '../types';

interface VideoGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  options: VideoOptions;
  setOptions: (options: VideoOptions) => void;
  onSubmit: () => void;
  isGenerating: boolean;
  isKeyValid: boolean;
}

const aspectRatios: AspectRatio[] = ["16:9", "9:16", "1:1", "4:3", "3:4"];
const models = ["veo-2.0-generate-001", "veo-3-generate-preview", "veo-3-fast-generate-preview"];

const safetyPolicies: { value: SafetyPolicy; label: string }[] = [
  { value: 'ALLOW_ALL', label: 'Allow All People' },
  { value: 'ALLOW_ADULT', label: 'Allow Adults Only' },
  { value: 'DISALLOW_PEOPLE', label: 'Disallow People' },
];

const resolutions: { value: Resolution; label: string }[] = [
  { value: '1080p', label: '1080p FHD' },
  { value: '720p', label: '720p HD' },
];


const VideoGeneratorForm: React.FC<VideoGeneratorFormProps> = ({
  prompt,
  setPrompt,
  options,
  setOptions,
  onSubmit,
  isGenerating,
  isKeyValid,
}) => {
  const isDisabled = isGenerating || !isKeyValid;

  const handleOptionChange = <K extends keyof VideoOptions,>(key: K, value: VideoOptions[K]) => {
    setOptions({ ...options, [key]: value });
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <fieldset disabled={isDisabled} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-brand-text-secondary mb-2">
            Video Prompt
          </label>
          <textarea
            id="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A majestic lion roaring on a rocky outcrop at sunset"
            className="w-full bg-brand-surface border border-brand-secondary rounded-lg p-4 text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="negative-prompt" className="block text-sm font-medium text-brand-text-secondary mb-2">
            Negative Prompt (Optional)
          </label>
          <textarea
            id="negative-prompt"
            rows={2}
            value={options.negativePrompt}
            onChange={(e) => handleOptionChange('negativePrompt', e.target.value)}
            placeholder="e.g., blurry, low quality, cartoonish, watermark"
            className="w-full bg-brand-surface border border-brand-secondary rounded-lg p-4 text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:opacity-50"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-brand-text-secondary mb-2">
              Model
            </label>
            <select
              id="model"
              value={options.model}
              onChange={(e) => handleOptionChange('model', e.target.value)}
              className="w-full bg-brand-surface border border-brand-secondary rounded-lg py-2 px-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:opacity-50"
            >
              {models.map(model => <option key={model} value={model}>{model}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="aspect-ratio" className="block text-sm font-medium text-brand-text-secondary mb-2">
              Aspect Ratio
            </label>
            <select
              id="aspect-ratio"
              value={options.aspectRatio}
              onChange={(e) => handleOptionChange('aspectRatio', e.target.value as AspectRatio)}
              className="w-full bg-brand-surface border border-brand-secondary rounded-lg py-2 px-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:opacity-50"
            >
              {aspectRatios.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="resolution" className="block text-sm font-medium text-brand-text-secondary mb-2">
              Resolution
            </label>
            <select
              id="resolution"
              value={options.resolution}
              onChange={(e) => handleOptionChange('resolution', e.target.value as Resolution)}
              className="w-full bg-brand-surface border border-brand-secondary rounded-lg py-2 px-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:opacity-50"
            >
              {resolutions.map(res => <option key={res.value} value={res.value}>{res.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="safety-policy" className="block text-sm font-medium text-brand-text-secondary mb-2">
              Person Safety Policy
            </label>
            <select
              id="safety-policy"
              value={options.safetyPolicy}
              onChange={(e) => handleOptionChange('safetyPolicy', e.target.value as SafetyPolicy)}
              className="w-full bg-brand-surface border border-brand-secondary rounded-lg py-2 px-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors disabled:opacity-50"
            >
              {safetyPolicies.map(policy => <option key={policy.value} value={policy.value}>{policy.label}</option>)}
            </select>
          </div>
        </div>

      </fieldset>
      
      <button
        onClick={onSubmit}
        disabled={isDisabled || !prompt.trim()}
        className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-primary transition-all disabled:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isGenerating ? 'Generating...' : 'Generate Video'}
      </button>
    </div>
  );
};

export default VideoGeneratorForm;

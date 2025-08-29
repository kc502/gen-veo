import React, { useState, useCallback } from 'react';
import type { VideoOptions, LoadingState, ApiKeyStatus } from './types';
import ApiKeyInput from './components/ApiKeyInput';
import VideoGeneratorForm from './components/VideoGeneratorForm';
import LoadingIndicator from './components/LoadingIndicator';
import VideoResult from './components/VideoResult';
import { validateApiKey, generateVideo } from './services/geminiService';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [apiKeyStatus, setApiKeyStatus] = useState<ApiKeyStatus>('unchecked');
  const [prompt, setPrompt] = useState<string>('');
  const [options, setOptions] = useState<VideoOptions>({
    model: 'veo-2.0-generate-001',
    aspectRatio: '16:9',
    negativePrompt: '',
    safetyPolicy: 'ALLOW_ALL',
    resolution: '1080p',
  });
  const [loadingState, setLoadingState] = useState<LoadingState>({ status: 'idle', message: '' });
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValidateKey = useCallback(async (key: string) => {
    setLoadingState({ status: 'validating', message: 'Validating API Key...' });
    const isValid = await validateApiKey(key);
    setApiKeyStatus(isValid ? 'valid' : 'invalid');
    setLoadingState({ status: 'idle', message: '' });
  }, []);

  const handleGenerate = async () => {
    if (!prompt || apiKeyStatus !== 'valid') return;

    setGeneratedVideoUrl(null);
    setError(null);
    setLoadingState({ status: 'generating', message: 'Starting video generation...' });

    try {
      // Short delay to update UI before long-running task
      await new Promise(res => setTimeout(res, 100));
      
      setLoadingState({ status: 'polling', message: 'Processing your video. This may take a few minutes...' });
      const videoUrl = await generateVideo(apiKey, prompt, options);
      
      setGeneratedVideoUrl(videoUrl);
      setLoadingState({ status: 'success', message: 'Video generated!' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error(err);
      setError(errorMessage);
      setLoadingState({ status: 'error', message: errorMessage });
    }
  };

  const isProcessing = loadingState.status === 'generating' || loadingState.status === 'polling' || loadingState.status === 'validating';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
          VEO Video Generator
        </h1>
        <p className="mt-2 text-lg text-brand-text-secondary">
          Bring your creative ideas to life with Google's VEO model.
        </p>
      </header>
      
      <main className="w-full flex flex-col items-center space-y-8">
        <ApiKeyInput 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          apiKeyStatus={apiKeyStatus} 
          validateKey={handleValidateKey}
          isLoading={loadingState.status === 'validating'} 
        />
        
        <div className="w-full h-px bg-brand-secondary"></div>

        <VideoGeneratorForm
          prompt={prompt}
          setPrompt={setPrompt}
          options={options}
          setOptions={setOptions}
          onSubmit={handleGenerate}
          isGenerating={isProcessing}
          isKeyValid={apiKeyStatus === 'valid'}
        />

        <div className="w-full flex justify-center items-center py-8">
          {isProcessing ? (
            <LoadingIndicator loadingState={loadingState} />
          ) : (
            <VideoResult videoUrl={generatedVideoUrl} error={error} />
          )}
        </div>
      </main>

      <footer className="text-center text-brand-text-secondary text-sm">
        <p>&copy; {new Date().getFullYear()} VEO Generator. Built for demonstration.</p>
      </footer>
    </div>
  );
};

export default App;

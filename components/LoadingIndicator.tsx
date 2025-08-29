
import React from 'react';
import type { LoadingState } from '../types';

interface LoadingIndicatorProps {
  loadingState: LoadingState;
}

const loadingMessages = [
  "Reticulating splines...",
  "Warming up the pixels...",
  "This can take a few minutes, please be patient.",
  "Composing the cinematic masterpiece...",
  "Adjusting the flux capacitor...",
  "Almost there, just polishing the final frames."
];

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loadingState }) => {
    const [dynamicMessage, setDynamicMessage] = React.useState(loadingMessages[0]);

    React.useEffect(() => {
        if (loadingState.status === 'polling') {
            const interval = setInterval(() => {
                setDynamicMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [loadingState.status]);

  if (loadingState.status === 'idle' || loadingState.status === 'success') {
    return null;
  }

  const messageToShow = loadingState.status === 'polling' ? dynamicMessage : loadingState.message;

  return (
    <div className="w-full max-w-2xl text-center p-8 bg-brand-surface rounded-lg border border-brand-secondary">
      <div className="flex justify-center items-center mb-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
      <p className="text-lg font-semibold text-brand-text">{messageToShow}</p>
      <p className="text-sm text-brand-text-secondary mt-2">
        Video generation is a complex process. Please keep this window open.
      </p>
    </div>
  );
};

export default LoadingIndicator;

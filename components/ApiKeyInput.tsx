
import React, { useState, useCallback } from 'react';
import type { ApiKeyStatus } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  apiKeyStatus: ApiKeyStatus;
  validateKey: (key: string) => void;
  isLoading: boolean;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey, apiKeyStatus, validateKey, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleValidation = useCallback(() => {
    if (apiKey) {
      validateKey(apiKey);
    }
  }, [apiKey, validateKey]);

  const borderColor = isFocused
    ? 'border-brand-primary'
    : apiKeyStatus === 'valid'
    ? 'border-green-500'
    : apiKeyStatus === 'invalid'
    ? 'border-red-500'
    : 'border-brand-secondary';

  return (
    <div className="w-full max-w-2xl">
      <label htmlFor="api-key" className="block text-sm font-medium text-brand-text-secondary mb-2">
        Gemini API Key
      </label>
      <div className="relative">
        <input
          id="api-key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            handleValidation();
          }}
          placeholder="Enter your API key here"
          className={`w-full bg-brand-surface border ${borderColor} rounded-lg py-2 pl-4 pr-24 text-brand-text placeholder-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors`}
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {apiKeyStatus === 'valid' && <CheckIcon className="h-6 w-6 text-green-500" />}
          {apiKeyStatus === 'invalid' && <XIcon className="h-6 w-6 text-red-500" />}
        </div>
      </div>
      <p className="text-xs text-brand-text-secondary mt-2">
        Your API key is used only in your browser and is not stored on any server.
      </p>
    </div>
  );
};

export default ApiKeyInput;

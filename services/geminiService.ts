import { GoogleGenAI } from "@google/genai";
import type { VideoOptions } from '../types';

export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  if (!apiKey) return false;
  try {
    const ai = new GoogleGenAI({ apiKey });
    // A lightweight call to check if authentication works.
    await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'ping',
      config: { thinkingConfig: { thinkingBudget: 0 }, maxOutputTokens: 1 }
    });
    return true;
  } catch (error) {
    console.error("API Key validation failed:", error);
    return false;
  }
};

export const generateVideo = async (
  apiKey: string,
  prompt: string,
  options: VideoOptions
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });

  const config: { [key: string]: any } = {
    numberOfVideos: 1,
    aspectRatio: options.aspectRatio,
    resolution: options.resolution,
    safetyPolicy: options.safetyPolicy,
  };

  if (options.negativePrompt) {
    config.negativePrompt = options.negativePrompt;
  }

  let operation = await ai.models.generateVideos({
    model: options.model,
    prompt: prompt,
    config: config
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("Video URI not found in API response.");
  }

  const videoResponse = await fetch(`${downloadLink}&key=${apiKey}`);
  if (!videoResponse.ok) {
    const errorText = await videoResponse.text();
    throw new Error(`Failed to download video: ${videoResponse.statusText} - ${errorText}`);
  }

  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
};

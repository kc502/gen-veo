
import React from 'react';

interface VideoResultProps {
  videoUrl: string | null;
  error: string | null;
}

const VideoResult: React.FC<VideoResultProps> = ({ videoUrl, error }) => {
  if (!videoUrl && !error) {
    return null;
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-300">
        <h3 className="font-bold">Generation Failed</h3>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (videoUrl) {
    return (
      <div className="w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Your Video is Ready!</h2>
        <video src={videoUrl} controls autoPlay loop className="w-full rounded-lg shadow-lg">
          Your browser does not support the video tag.
        </video>
        <a
          href={videoUrl}
          download={`veo-generated-video-${Date.now()}.mp4`}
          className="block w-full text-center bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-green-500 transition-colors"
        >
          Download Video
        </a>
      </div>
    );
  }
  
  return null;
};

export default VideoResult;

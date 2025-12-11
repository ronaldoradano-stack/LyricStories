import React, { useState } from 'react';
import { Send, Music } from 'lucide-react';

interface MoodInputProps {
  onSubmit: (mood: string, style: string) => void;
  isLoading: boolean;
}

const STYLES = ['Pop', 'Rap', 'Rock', 'Country', 'R&B'];

export const MoodInput: React.FC<MoodInputProps> = ({ onSubmit, isLoading }) => {
  const [mood, setMood] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Pop');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim()) {
      onSubmit(mood, selectedStyle);
    }
  };

  return (
    <div className="w-full space-y-4">
      <form onSubmit={handleSubmit} className="w-full relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Music className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How are you feeling right now?"
          disabled={isLoading}
          className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-14 py-4 rounded-2xl 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 
                     transition-all duration-300 placeholder:text-slate-500
                     disabled:opacity-50 disabled:cursor-not-allowed text-lg font-light"
        />
        <button
          type="submit"
          disabled={!mood.trim() || isLoading}
          className="absolute inset-y-2 right-2 px-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl
                     transition-all duration-200 disabled:opacity-0 disabled:transform disabled:translate-x-4
                     flex items-center justify-center shadow-lg shadow-purple-900/20"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Minimalist Style Selectors */}
      <div className="flex flex-wrap justify-center gap-2">
        {STYLES.map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setSelectedStyle(style)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border
              ${
                selectedStyle === style
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                  : 'bg-slate-800/50 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
              }
            `}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};
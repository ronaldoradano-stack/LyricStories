import React, { useState } from 'react';
import { Send, Music } from 'lucide-react';

interface MoodInputProps {
  onSubmit: (mood: string) => void;
  isLoading: boolean;
}

export const MoodInput: React.FC<MoodInputProps> = ({ onSubmit, isLoading }) => {
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mood.trim()) {
      onSubmit(mood);
    }
  };

  return (
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
  );
};
import React, { useState } from 'react';
import { MoodInput } from './components/MoodInput';
import { SongDisplay } from './components/SongDisplay';
import { generateSongLyrics } from './services/geminiService';
import { Loader } from 'lucide-react';

const App: React.FC = () => {
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMoodSubmit = async (mood: string) => {
    setIsLoading(true);
    setError(null);
    setLyrics(null);

    try {
      const generatedLyrics = await generateSongLyrics(mood);
      setLyrics(generatedLyrics);
    } catch (err) {
      console.error("Failed to generate lyrics:", err);
      setError("We couldn't catch that vibe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-2xl p-6 md:p-12 relative overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl shadow-2xl">
        
        <div className="relative z-10">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200 mb-3">
              Mood Melody
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-light">
              Get lyrics based on your current mood. Unique every time.
            </p>
          </header>

          <div className="space-y-8">
            <MoodInput 
              onSubmit={handleMoodSubmit} 
              isLoading={isLoading} 
            />

            <div className="min-h-[200px] flex items-center justify-center">
              {isLoading && (
                <div className="flex flex-col items-center text-purple-200/80 animate-fade-in">
                  <Loader className="w-8 h-8 animate-spin mb-3" />
                  <p className="text-sm tracking-widest uppercase font-semibold">Composing...</p>
                </div>
              )}

              {error && (
                <div className="text-red-300 bg-red-900/20 px-6 py-4 rounded-xl text-center border border-red-500/30 animate-fade-in">
                  {error}
                </div>
              )}

              {lyrics && !isLoading && (
                <SongDisplay lyrics={lyrics} />
              )}

              {!lyrics && !isLoading && !error && (
                <div className="text-slate-500 italic text-center text-sm opacity-50">
                  Ready to listen...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
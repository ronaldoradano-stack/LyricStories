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
      {/* 
        The Main App Card 
        - bg-slate-900/90: Base dark color
        - bg-gradient-to-br: Adds the purple dimension
        - backdrop-blur: Glass effect
      */}
      <main className="w-full max-w-2xl p-6 md:p-12 relative overflow-hidden 
                       bg-slate-900/90 bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900 
                       backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl">
        
        {/* Internal Glow Effect for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <header className="text-center mb-10">
            {/* pb-2 added to prevent clipping of descenders (g, y, p) in gradient text */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200 mb-3 drop-shadow-sm pb-2">
              Mood Lyrics
            </h1>
            <p className="text-purple-200/60 text-sm md:text-base font-light tracking-wide">
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
                <div className="text-slate-500/60 italic text-center text-sm">
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
import React from 'react';
import { Sparkles, Copy, Check, Twitter, MessageCircle, Share2 } from 'lucide-react';

interface SongDisplayProps {
  lyrics: string;
}

export const SongDisplay: React.FC<SongDisplayProps> = ({ lyrics }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareMessage = `My current mood in lyrics:\n\n"${lyrics}"\n\nCreate your own at lyricstories.com`;
  const shareTextEncoded = encodeURIComponent(shareMessage);
  
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareTextEncoded}`;
  const whatsappUrl = `https://wa.me/?text=${shareTextEncoded}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lyric Stories',
          text: shareMessage,
          url: 'https://lyricstories.com',
        });
      } catch (err) {
        // User cancelled or error, ignore
        console.debug('Share cancelled');
      }
    }
  };

  // Check if native share is supported (mostly mobile)
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="w-full animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-serif italic text-purple-200 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse-slow" />
          Here's your song!
        </h2>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col">
          {/* Top Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title="Copy lyrics"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Lyrics Content */}
          <div className="space-y-3 text-center mb-8">
            {lyrics.split('\n').filter(line => line.trim() !== '').map((line, index) => (
              <p 
                key={index} 
                className="text-lg md:text-xl font-medium leading-relaxed tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-slate-200"
                style={{
                    animationDelay: `${index * 150}ms`
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Share Actions Footer */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold mr-2">Share</span>
            
            <a 
              href={twitterUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-slate-800 hover:bg-[#1DA1F2] text-slate-400 hover:text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              title="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-slate-800 hover:bg-[#25D366] text-slate-400 hover:text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {canNativeShare && (
              <button 
                onClick={handleNativeShare}
                className="p-2 bg-slate-800 hover:bg-purple-600 text-slate-400 hover:text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                title="More sharing options"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
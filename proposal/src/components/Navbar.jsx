import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Heart, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize HTML5 audio player
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/70 dark:bg-romantic-dark/70 border-b border-romantic-rose/20 dark:border-romantic-gold/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-romantic-rose animate-pulse fill-romantic-rose" />
          <span className="font-serif font-bold text-lg tracking-wide bg-gradient-to-r from-romantic-rose to-romantic-maroon dark:from-romantic-gold dark:to-romantic-rose bg-clip-text text-transparent">
            Our Love Story
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Real Audio Player Button */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-full transition-all flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 border shadow-sm ${
              isPlaying
                ? 'bg-gradient-to-r from-romantic-rose to-romantic-gold text-white border-white animate-pulse'
                : 'bg-romantic-cream dark:bg-romantic-maroon/60 text-romantic-maroon dark:text-romantic-gold border-romantic-rose/30 hover:scale-105'
            }`}
            title="Play / Pause Romantic Song"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span className="font-semibold">Playing "Into You" 🎶</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 opacity-80" />
                <span>Play Our Song 🎵</span>
              </>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-romantic-cream dark:bg-romantic-maroon text-romantic-maroon dark:text-romantic-gold hover:scale-110 transition-transform shadow-md border border-romantic-rose/30"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-romantic-gold" /> : <Moon className="w-4 h-4 text-romantic-maroon" />}
          </button>
        </div>
      </div>
    </header>
  );
}

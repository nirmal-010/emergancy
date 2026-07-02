import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Heart, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroSection({ config }) {
  const [loveClicks, setLoveClicks] = useState(0);

  const scrollToTimeline = () => {
    const el = document.getElementById('story-timeline');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const triggerLoveExplosion = (e) => {
    e.stopPropagation();
    setLoveClicks((prev) => prev + 1);
    
    // Shoot cute mini confetti burst
    confetti({
      particleCount: 25,
      spread: 70,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#FAD2E1', '#F28482', '#ff0055', '#D4AF37'],
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Soft Glow Circles in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-romantic-blush/30 dark:bg-romantic-maroon/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-romantic-gold/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Cute Floating Corner Stickers */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-8 sm:left-20 text-3xl sm:text-5xl select-none pointer-events-none drop-shadow-md"
      >
        🎧✨
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-36 right-8 sm:right-24 text-3xl sm:text-5xl select-none pointer-events-none drop-shadow-md"
      >
        💌🥰
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-cream/90 dark:bg-romantic-maroon/80 border border-romantic-rose/40 text-romantic-maroon dark:text-romantic-gold text-sm font-medium mb-6 shadow-sm backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-romantic-gold animate-spin" />
          <span>Made with every beat of my heart</span>
          <Heart className="w-3.5 h-3.5 fill-romantic-rose text-romantic-rose animate-bounce" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
        >
          Dearest{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-romantic-rose via-red-500 to-romantic-maroon dark:from-romantic-gold dark:via-romantic-gold-light dark:to-romantic-rose">
            {config.partnerName}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          "{config.subtitle}"
        </motion.p>

        {/* Decorative Photo Avatar / Heart Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto mb-10 rounded-full p-2.5 bg-gradient-to-tr from-romantic-rose via-romantic-gold to-romantic-blush shadow-2xl group"
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-romantic-dark">
            <img
              src={config.bgImage}
              alt={config.partnerName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          {/* Cute Wiggling Badge */}
          <motion.div
            animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute -bottom-2 -right-2 bg-white dark:bg-romantic-maroon p-3.5 rounded-full shadow-xl border-2 border-romantic-gold flex items-center justify-center text-xl"
            title="You are my favorite person!"
          >
            💖
          </motion.div>
        </motion.div>

        {/* Interactive Cute Button: Send Love / Love Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-14"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={triggerLoveExplosion}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-pink-500/40 transition-all border border-white/40"
          >
            <Heart className="w-4 h-4 fill-white animate-ping" />
            <span>Tap for Love Explosion 💥 ({loveClicks > 0 ? `${loveClicks * 100}% Love Sent!` : 'Send Love'})</span>
          </motion.button>
        </motion.div>

        {/* Scroll CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={scrollToTimeline}
            className="group inline-flex flex-col items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-romantic-rose dark:hover:text-romantic-gold transition-colors focus:outline-none"
          >
            <span className="tracking-widest uppercase text-xs">{config.scrollText}</span>
            <div className="w-10 h-10 rounded-full bg-romantic-cream dark:bg-romantic-maroon/80 border border-romantic-rose/30 flex items-center justify-center shadow-md group-hover:translate-y-1 transition-transform">
              <ChevronDown className="w-5 h-5 text-romantic-rose dark:text-romantic-gold animate-bounce" />
            </div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

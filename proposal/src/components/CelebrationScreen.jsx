import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';

export default function CelebrationScreen({ celebration }) {
  useEffect(() => {
    // Launch celebratory fireworks & confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Launch fireworks from left and right edges
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FAD2E1', '#F28482', '#D4AF37', '#ff0000', '#ffffff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FAD2E1', '#F28482', '#D4AF37', '#ff0000', '#ffffff'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-romantic-maroon via-romantic-dark to-black text-white flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto"
    >
      <div className="max-w-2xl w-full text-center relative z-10 glass-card !bg-black/70 !border-romantic-gold p-8 sm:p-14 rounded-3xl shadow-[0_0_80px_rgba(212,175,55,0.4)] my-auto">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-romantic-rose to-romantic-gold flex items-center justify-center shadow-lg border-2 border-white"
        >
          <PartyPopper className="w-10 h-10 text-white" />
        </motion.div>

        <span className="text-sm font-semibold uppercase tracking-widest text-romantic-gold block mb-2">
          {celebration.subtitle}
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-romantic-blush via-white to-romantic-gold">
          {celebration.title}
        </h1>

        <p className="text-romantic-cream text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto font-light">
          "{celebration.message}"
        </p>

        {celebration.photo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden border-4 border-romantic-gold/60 shadow-2xl mb-8"
          >
            <img
              src={celebration.photo}
              alt="Celebration"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-romantic-rose/20 border border-romantic-rose text-romantic-blush text-sm font-medium">
          <Heart className="w-4 h-4 fill-romantic-rose text-romantic-rose animate-bounce" />
          <span>Our forever starts right now ❤️</span>
          <Sparkles className="w-4 h-4 text-romantic-gold" />
        </div>
      </div>
    </motion.section>
  );
}

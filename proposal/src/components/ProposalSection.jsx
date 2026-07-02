import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function ProposalSection({ proposal, onYes }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [dodgeCount, setDodgeCount] = useState(0);

  const teaseMessages = [
    "No way 😜",
    "Hey! Wrong button 🙈",
    "Are you sure?? 🥺",
    "Not an option! ❤️",
    "Catch me if you can! 🏃‍♀️",
    "Look at the big YES button instead! 💍",
    "Resistance is futile 😘",
  ];

  const dodgeNoButton = (e) => {
    e.preventDefault();
    // Calculate random offset within -180px to +180px horizontally and vertically
    const randomX = (Math.random() - 0.5) * 320;
    const randomY = (Math.random() - 0.5) * 260;

    setNoPosition({ x: randomX, y: randomY });
    setNoScale((prev) => Math.max(0.35, prev * 0.88));
    setDodgeCount((prev) => prev + 1);
  };

  const currentTease = teaseMessages[Math.min(dodgeCount, teaseMessages.length - 1)];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-romantic-maroon via-black to-romantic-dark text-white flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute w-[600px] h-[600px] bg-romantic-rose/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="max-w-2xl w-full text-center relative z-10 glass-card !bg-black/60 !border-romantic-gold/50 p-8 sm:p-14 rounded-3xl shadow-2xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-romantic-rose to-romantic-gold flex items-center justify-center shadow-lg border-2 border-white"
        >
          <Heart className="w-10 h-10 fill-white text-white" />
        </motion.div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-romantic-blush via-white to-romantic-gold">
          {proposal.title}
        </h1>

        <p className="text-romantic-cream/90 text-base sm:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto">
          "{proposal.message}"
        </p>

        {dodgeCount > 0 && (
          <motion.p
            key={dodgeCount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-romantic-gold font-medium text-sm sm:text-base mb-6 animate-bounce"
          >
            ✨ {currentTease} ✨
          </motion.p>
        )}

        {/* Buttons Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
            className="z-20 px-10 py-5 rounded-full bg-gradient-to-r from-romantic-rose via-red-500 to-romantic-gold text-white font-serif font-bold text-xl sm:text-2xl shadow-[0_0_30px_rgba(242,132,130,0.6)] hover:shadow-[0_0_50px_rgba(212,175,55,0.9)] transition-all border-2 border-white flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6 animate-spin" />
            <span>{proposal.yesButtonText}</span>
            <Sparkles className="w-6 h-6 animate-spin" />
          </motion.button>

          {/* Runaway NO Button */}
          <motion.button
            animate={{
              x: noPosition.x,
              y: noPosition.y,
              scale: noScale,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={dodgeNoButton}
            onMouseMove={dodgeNoButton}
            onTouchStart={dodgeNoButton}
            onClick={dodgeNoButton}
            style={{ position: dodgeCount > 0 ? 'absolute' : 'relative' }}
            className="px-6 py-3 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 font-medium text-sm sm:text-base border border-gray-600 shadow-md select-none transition-colors"
          >
            {proposal.noButtonText}
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeartClickBurst() {
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Create 3-4 cute floating symbols around the click location
      const emojis = ['❤️', '💖', '✨', '🌸', '🥰', '💌', '😍', '💘'];
      const newBursts = Array.from({ length: 4 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 50,
        y: e.clientY + (Math.random() - 0.5) * 30,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 16 + 18,
        angle: (Math.random() - 0.5) * 60,
      }));

      setBursts((prev) => [...prev, ...newBursts]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Clean up old bursts
  useEffect(() => {
    if (bursts.length > 0) {
      const timer = setTimeout(() => {
        setBursts((prev) => prev.slice(4));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [bursts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 1, scale: 0.3, x: b.x, y: b.y }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: b.y - 120 - Math.random() * 50,
              x: b.x + b.angle,
              rotate: b.angle * 2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute select-none pointer-events-none"
            style={{ fontSize: `${b.size}px` }}
          >
            {b.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

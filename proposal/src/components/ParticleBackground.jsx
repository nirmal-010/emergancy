import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ParticleBackground() {
  // Generate lightweight random floating hearts and sparkles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      size: Math.random() * 16 + 10, // px
      duration: Math.random() * 15 + 10, // seconds
      delay: Math.random() * 10,
      symbol: i % 3 === 0 ? '❤️' : i % 3 === 1 ? '✨' : '🌸',
      opacity: Math.random() * 0.35 + 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          initial={{
            y: '105vh',
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}

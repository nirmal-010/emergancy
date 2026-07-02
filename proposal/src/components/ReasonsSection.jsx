import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function ReasonsSection({ reasons }) {
  const [flippedIds, setFlippedIds] = useState({});

  const toggleFlip = (id) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-romantic-rose dark:text-romantic-gold font-semibold block mb-2">
            Straight From My Soul
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Reasons Why I Love You
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-romantic-rose to-romantic-gold mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mt-4 text-sm sm:text-base">
            Click or tap any card below to flip it over and read my secret note inside ✨
          </p>
        </motion.div>

        {/* Grid of Interactive Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const IconComponent = Icons[reason.icon] || Icons.Heart;
            const isFlipped = !!flippedIds[reason.id];

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => toggleFlip(reason.id)}
                className="cursor-pointer h-72 [perspective:1000px] select-none"
              >
                <div
                  className={`relative w-full h-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] shadow-lg ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl glass-card p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] border-2 border-romantic-rose/30 dark:border-romantic-gold/30 hover:border-romantic-rose">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-romantic-rose to-romantic-gold flex items-center justify-center text-white mb-6 shadow-md transform hover:rotate-6 transition-transform">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {reason.title}
                    </h3>
                    <span className="text-xs text-romantic-rose dark:text-romantic-gold font-medium mt-auto flex items-center gap-1">
                      <span>Tap to read note</span>
                      <span>🔄</span>
                    </span>
                  </div>

                  {/* Back Side (Secret Message) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-romantic-rose/95 via-romantic-maroon to-romantic-dark text-white p-6 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl border-2 border-romantic-gold/50">
                    <Icons.Heart className="w-6 h-6 text-romantic-gold fill-romantic-gold mb-3 animate-pulse" />
                    <h4 className="font-serif font-bold text-lg text-romantic-gold mb-2">
                      {reason.title}
                    </h4>
                    <p className="text-sm font-light leading-relaxed text-romantic-cream overflow-y-auto max-h-40 px-2">
                      "{reason.secret}"
                    </p>
                    <span className="text-[11px] text-white/70 mt-auto pt-2">
                      Tap to flip back
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

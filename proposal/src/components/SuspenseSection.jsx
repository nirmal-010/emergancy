import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, KeyRound } from 'lucide-react';

export default function SuspenseSection({ suspense, onUnlock }) {
  return (
    <section className="py-28 px-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto glass-card p-8 sm:p-14 rounded-3xl border-2 border-romantic-rose/40 dark:border-romantic-gold/40 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-romantic-gold/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-romantic-rose/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-romantic-rose to-romantic-gold flex items-center justify-center text-white shadow-lg animate-bounce">
          <KeyRound className="w-8 h-8" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {suspense.title}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-light">
          {suspense.subtitle}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onUnlock}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-romantic-rose via-red-500 to-romantic-maroon dark:from-romantic-gold dark:via-yellow-500 dark:to-romantic-rose text-white dark:text-gray-900 font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all border-2 border-white/50"
        >
          <Sparkles className="w-5 h-5 animate-spin" />
          <span>{suspense.buttonText}</span>
          <Sparkles className="w-5 h-5 animate-spin" />
        </motion.button>
      </motion.div>
    </section>
  );
}

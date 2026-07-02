import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Heart } from 'lucide-react';

export default function GallerySection({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-24 px-4 relative z-10 bg-romantic-cream/30 dark:bg-romantic-dark/40 border-y border-romantic-rose/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-romantic-rose dark:text-romantic-gold font-semibold block mb-2">
            Captured Moments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Our Favorite Memories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-romantic-rose to-romantic-gold mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mt-4 text-sm sm:text-base">
            Click any photo to view closer. Each frame drifts gently in the breeze holding a piece of my heart.
          </p>
        </motion.div>

        {/* Airy Floating Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gallery.map((photo, idx) => {
            // Calculate organic breezy float parameters for each item
            const floatDuration = 4 + (idx % 4) * 0.8;
            const startAngle = (idx % 2 === 0 ? -1 : 1) * (1.5 + (idx % 3) * 0.5);

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Continuous Air Float Wrapper */}
                <motion.div
                  animate={{
                    y: [0, -14, 0],
                    rotate: [startAngle, -startAngle, startAngle],
                  }}
                  transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  onClick={() => setSelectedImage(photo)}
                  className="group relative cursor-pointer overflow-hidden rounded-3xl aspect-[4/3] shadow-xl border-4 border-white/90 dark:border-romantic-gold/40 hover:shadow-2xl transition-all duration-300 hover:!rotate-0 hover:scale-105"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm font-medium drop-shadow line-clamp-2">
                        {photo.caption}
                      </p>
                      <ZoomIn className="w-5 h-5 text-romantic-gold flex-shrink-0 ml-2" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white dark:bg-romantic-maroon rounded-3xl overflow-hidden shadow-2xl border border-romantic-gold/40"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 text-center bg-white dark:bg-romantic-maroon">
                <p className="font-serif text-lg sm:text-xl text-gray-800 dark:text-white flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-romantic-rose fill-romantic-rose" />
                  <span>{selectedImage.caption}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

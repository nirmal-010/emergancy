import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart } from 'lucide-react';

export default function TimelineSection({ timeline }) {
  return (
    <section id="story-timeline" className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-romantic-rose dark:text-romantic-gold font-semibold block mb-2">
            Step By Step
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Our Story So Far
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-romantic-rose to-romantic-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical line connecting memories */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-romantic-rose via-romantic-gold to-romantic-rose -translate-x-1/2 hidden sm:block" />

          <div className="space-y-16 sm:space-y-24">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              // Unique duration and float range for realistic airy feeling
              const floatDuration = 4.5 + (index % 3) * 1.2;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className={`flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Left / Right Content Box */}
                  <div className={`w-full sm:w-1/2 ${isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group shadow-xl">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-romantic-rose/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125" />
                      
                      <div className={`flex items-center gap-2 text-xs font-medium text-romantic-rose dark:text-romantic-gold mb-3 ${
                        isEven ? 'sm:justify-end' : 'sm:justify-start'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.location && (
                        <div className={`inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-romantic-cream/60 dark:bg-romantic-dark/60 px-3 py-1.5 rounded-full border border-romantic-rose/20 ${
                          isEven ? 'sm:ml-auto' : ''
                        }`}>
                          <MapPin className="w-3.5 h-3.5 text-romantic-rose dark:text-romantic-gold" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-romantic-rose to-romantic-gold text-white shadow-lg border-4 border-white dark:border-romantic-dark flex-shrink-0">
                    <Heart className="w-5 h-5 fill-white animate-pulse" />
                  </div>

                  {/* Airy Floating Photo Frame */}
                  <div className={`w-full sm:w-1/2 ${isEven ? 'sm:pl-12' : 'sm:pr-12'}`}>
                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                        rotate: isEven ? [-1.5, 1.5, -1.5] : [1.5, -1.5, 1.5],
                      }}
                      transition={{
                        duration: floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group border-4 border-white/90 dark:border-romantic-gold/40 transform transition-all duration-500 hover:!rotate-0 hover:scale-105"
                    >
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium text-sm drop-shadow-md">
                          📸 {item.title}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

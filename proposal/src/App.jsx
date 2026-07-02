import React, { useState, useEffect } from 'react';
import { proposalConfig } from './config';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import HeartClickBurst from './components/HeartClickBurst';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import ReasonsSection from './components/ReasonsSection';
import SuspenseSection from './components/SuspenseSection';
import ProposalSection from './components/ProposalSection';
import CelebrationScreen from './components/CelebrationScreen';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Sync dark mode class on HTML document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${darkMode ? 'dark bg-romantic-dark text-white' : 'bg-romantic-cream/20 text-gray-800'}`}>
      {/* Interactive Click Hearts & Floating Background */}
      <HeartClickBurst />
      <ParticleBackground />

      {/* Header Bar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Single-Page Scroll Content */}
      <main className="relative z-10 overflow-hidden">
        <HeroSection config={proposalConfig.hero} />
        
        <TimelineSection timeline={proposalConfig.timeline} />
        
        <GallerySection gallery={proposalConfig.gallery} />
        
        <ReasonsSection reasons={proposalConfig.reasons} />
        
        <SuspenseSection
          suspense={proposalConfig.suspense}
          onUnlock={() => setShowProposal(true)}
        />
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-romantic-rose/10 relative z-10">
        <p className="font-serif">
          Crafted with endless love for {proposalConfig.hero.partnerName} ❤️
        </p>
      </footer>

      {/* Full-Screen Dramatic Proposal Reveal Modal */}
      <AnimatePresence>
        {showProposal && !showCelebration && (
          <ProposalSection
            proposal={proposalConfig.proposal}
            onYes={() => setShowCelebration(true)}
          />
        )}
      </AnimatePresence>

      {/* Full-Screen Celebration (She Said Yes!) */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationScreen celebration={proposalConfig.celebration} />
        )}
      </AnimatePresence>
    </div>
  );
}

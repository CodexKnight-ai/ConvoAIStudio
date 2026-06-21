'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ChevronDown } from 'lucide-react';

const placeholders = [
  "Search podcasts...",
  "Search @LexFridman...",
  "Search /technology...",
  "Search channels..."
];

export function SearchHero() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchMode, setSearchMode] = useState<'all' | 'podcasts' | 'channels'>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholders
  useEffect(() => {
    if (isFocused) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isFocused]);

  // Keyboard shortcut "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-4 relative">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl lg:text-7xl font-bold font-primary text-center mb-8 text-white tracking-wide"
      >
        Discover Your Next <br className="hidden md:block" />
        <span className="text-white/80">
          Favorite Conversation
        </span>
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`relative w-full max-w-3xl transition-all duration-300 ${
          isFocused ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        <div className={`liquid-glass-strong relative flex items-center rounded-full overflow-visible transition-all ${
          isFocused ? 'shadow-[0_0_30px_rgba(255,255,255,0.1)]' : ''
        }`}>
          
          {/* Mode Selector */}
          <div className="relative border-r border-white/10 z-20">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-6 py-5 text-sm font-secondary font-bold text-white hover:text-white/80 transition-colors"
            >
              <span className="hidden sm:block capitalize">{searchMode}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-40 liquid-glass rounded-2xl shadow-xl overflow-hidden z-30 border border-white/10"
                >
                  {['all', 'podcasts', 'channels'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setSearchMode(mode as 'all' | 'podcasts' | 'channels');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-sans font-medium text-white/90 hover:bg-white/10 hover:text-white capitalize transition-colors"
                    >
                      {mode}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 flex items-center z-10">
            <Search className={`absolute left-4 w-5 h-5 transition-colors ${isFocused ? 'text-white' : 'text-white/50'}`} />
            
            {!isFocused && !query && (
              <div className="absolute left-12 pointer-events-none flex items-center h-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={placeholderIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/40 font-sans text-lg"
                  >
                    {placeholders[placeholderIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => {
                  setIsFocused(false);
                  setIsDropdownOpen(false);
                }, 200);
              }}
              className="w-full bg-transparent border-none outline-none text-white font-sans text-lg pl-12 pr-20 py-5 focus:ring-0 placeholder:text-transparent"
              placeholder=""
            />

            {/* Keyboard Hint */}
            <div className="absolute right-6 flex items-center gap-2">
              {!isFocused && !query && (
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 liquid-glass rounded-md text-xs text-white/70 font-mono border border-white/10">
                  <Command className="w-3 h-3" /> /
                </div>
              )}
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="p-1.5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

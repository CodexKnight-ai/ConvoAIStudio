'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

const COUNTRIES = [
  { name: "United States", flag: "🇺🇸", code: "US" },
  { name: "India", flag: "🇮🇳", code: "IN" },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
  { name: "Germany", flag: "🇩🇪", code: "DE" },
  { name: "Japan", flag: "🇯🇵", code: "JP" },
  { name: "South Korea", flag: "🇰🇷", code: "KR" },
];

const REGIONAL_PODCASTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Local Insights & News - Ep ${i + 1}`,
  creator: "Regional Network",
  rank: i + 1,
  image: `https://images.unsplash.com/photo-${1515187029159 + i}-0e14c3821034?q=80&w=400&auto=format&fit=crop`
}));

export function RegionalSection() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[1]); // Default India
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const scrollLeft = () => {
    const el = document.getElementById('regional-carousel');
    if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const el = document.getElementById('regional-carousel');
    if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      
      {/* Header & Country Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-secondary font-bold text-white flex items-center gap-2">
            Popular in {selectedCountry.name} {selectedCountry.flag}
          </h2>
        </div>

        <div className="relative z-20 w-full sm:w-64">
          <button
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
            className="w-full liquid-glass hover:bg-white/[0.03] rounded-xl px-4 py-2.5 flex items-center justify-between text-sm transition-colors"
          >
            <span className="flex items-center gap-2 text-white font-sans font-medium">
              <span className="text-lg">{selectedCountry.flag}</span>
              {selectedCountry.name}
            </span>
            <ChevronDown className={`w-4 h-4 text-white/50 transition-transform ${isSelectorOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isSelectorOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-full liquid-glass-strong rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="p-2 border-b border-white/10 relative z-10">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-sm font-sans text-white pl-8 py-1 placeholder:text-white/40"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar z-10 relative">
                  {filteredCountries.map(country => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsSelectorOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-left text-sm font-sans text-white/80 hover:text-white"
                    >
                      <span className="text-lg">{country.flag}</span>
                      {country.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-white/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div 
          id="regional-carousel"
          className="flex overflow-x-auto gap-6 pb-8 pt-4 snap-x snap-mandatory custom-scrollbar hide-scrollbar relative z-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REGIONAL_PODCASTS.map((podcast) => (
            <div 
              key={podcast.id} 
              className="snap-start flex-none w-64 group/card relative"
            >
              <div className="w-full aspect-square rounded-[2rem] overflow-hidden relative mb-4 liquid-glass-strong hover:bg-white/[0.03] transition-colors border border-white/5 hover:border-white/20">
                <img 
                  src={podcast.image} 
                  alt={podcast.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 mix-blend-overlay opacity-80 group-hover/card:opacity-100 group-hover/card:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-5xl font-black font-primary text-transparent [-webkit-text-stroke:2px_white] opacity-50 group-hover/card:opacity-100 transition-opacity">
                    {podcast.rank}
                  </span>
                </div>
              </div>
              
              <h4 className="text-white font-sans font-medium truncate mb-1 px-2">{podcast.title}</h4>
              <p className="text-white/60 font-sans text-sm truncate px-2">{podcast.creator}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

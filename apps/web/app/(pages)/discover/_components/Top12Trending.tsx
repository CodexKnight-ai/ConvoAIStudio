'use client';

import { Play, Headphones } from 'lucide-react';

const TOP_12 = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: `The Architecture of Future AI Systems - Part ${i + 1}`,
  creator: "Tech Visionaries",
  category: "Technology",
  plays: `${(Math.random() * 500 + 100).toFixed(1)}K`,
  image: `https://images.unsplash.com/photo-${1550751827 + i}-4b4d8f1d8bb?q=80&w=600&auto=format&fit=crop` // randomish image URL logic
}));

export function Top12Trending() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-secondary font-bold text-white mb-8 tracking-wide">More Trending Podcasts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOP_12.map((podcast, i) => (
          <div 
            key={podcast.id}
            className="group relative liquid-glass-strong hover:bg-white/[0.03] border border-white/5 hover:border-white/20 rounded-[2rem] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(8,145,178,0.2)] flex items-center gap-4"
          >
            {/* Thumbnail */}
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src={`https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop&sig=${i}`} // Hack for different images
                alt={podcast.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all">
                  <Play className="w-4 h-4 ml-1" fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-secondary font-bold text-cyan-400 mb-1 block uppercase tracking-widest">
                {podcast.category}
              </span>
              <h4 className="text-white font-sans font-medium text-base leading-tight mb-1 truncate">
                {podcast.title}
              </h4>
              <p className="text-white/60 font-sans text-sm mb-2 truncate">
                {podcast.creator}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-white/40 font-sans font-medium">
                <Headphones className="w-3 h-3" />
                {podcast.plays} plays
              </div>
            </div>
            
            {/* Rank Number */}
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full liquid-glass-strong border border-white/10 flex items-center justify-center text-xs font-bold font-sans text-white/60 shadow-md">
              {i + 4}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

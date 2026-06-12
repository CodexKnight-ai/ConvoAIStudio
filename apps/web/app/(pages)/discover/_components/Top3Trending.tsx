'use client';

import { useRef } from 'react';
import { Play, Heart, Headphones, Flame } from 'lucide-react';

const TOP_PODCASTS = [
  {
    id: 1,
    title: "The Future of General Artificial Intelligence",
    creator: "Lex Fridman",
    category: "AI",
    description: "In-depth conversation about the path to AGI, the alignment problem, and what it means for humanity's future.",
    listens: "1.2M",
    likes: "45K",
    duration: "2:45:10",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Building the Next Billion Dollar Startup",
    creator: "Y Combinator",
    category: "Startups",
    description: "Founders share their journey from zero to one. Lessons on product-market fit, fundraising, and scaling teams.",
    listens: "890K",
    likes: "32K",
    duration: "1:15:00",
    image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Quantum Computing Explained for Everyone",
    creator: "Huberman Lab",
    category: "Science",
    description: "Breaking down complex quantum mechanics into digestible concepts. How quantum computers will revolutionize medicine and encryption.",
    listens: "2.1M",
    likes: "95K",
    duration: "3:10:20",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop"
  }
];

export function Top3Trending() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-8xl mx-auto px-4 py-16" ref={containerRef}>
      <div className="flex items-center gap-3 mb-10">
        <Flame className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl md:text-4xl font-secondary text-white font-bold">Top 3 Trending</h2>
      </div>

      <div className="relative">
        {TOP_PODCASTS.map((podcast, index) => {
          return (
            <div
              key={podcast.id}
              className="sticky top-0 mb-24 w-full h-[45vh] min-h-[400px] flex items-center justify-center"
              style={{
                zIndex: index + 1,
              }}
            >
              <div 
                className="w-full h-full liquid-glass-strong rounded-[2.5rem] flex flex-col md:flex-row group"
                style={{
                  transform: `scale(${1 - (TOP_PODCASTS.length - 1 - index) * 0.02})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* Thumbnail */}
                <div className="w-full md:w-5/12 h-64 md:h-full relative overflow-hidden rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-tr-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 z-10 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 md:hidden" />
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="absolute top-6 left-6 z-20">
                    <div className="liquid-glass text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      Trending #{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative z-20">
                  <span className="text-cyan-400 font-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">
                    {podcast.category}
                  </span>
                  
                  <h3 className="text-3xl md:text-5xl text-white leading-tight mb-4 group-hover:text-white/90 transition-all">
                    {podcast.title}
                  </h3>
                  
                  <p className="text-white/70 font-sans text-lg mb-6">
                    {podcast.creator}
                  </p>
                  
                  <p className="text-white/50 font-sans line-clamp-2 md:line-clamp-3 mb-8 max-w-xl text-sm md:text-base leading-relaxed">
                    {podcast.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mt-auto">
                    <button className="w-14 h-14 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center hover:scale-105 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all">
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </button>
                    
                    <div className="flex items-center gap-4 text-sm font-sans font-medium text-white/70">
                      <div className="flex items-center gap-1.5 liquid-glass px-3 py-1 rounded-full">
                        <Headphones className="w-4 h-4" /> {podcast.listens}
                      </div>
                      <div className="flex items-center gap-1.5 liquid-glass px-3 py-1 rounded-full">
                        <Heart className="w-4 h-4" /> {podcast.likes}
                      </div>
                      <div className="liquid-glass px-3 py-1 rounded-full">
                        {podcast.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

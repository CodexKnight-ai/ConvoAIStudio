'use client';

import { CheckCircle2, Mic, Users } from 'lucide-react';

const CREATORS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  name: ["Lex Fridman", "Andrew Huberman", "Joe Rogan", "Sam Harris", "Chris Williamson", "Steven Bartlett", "Tim Ferriss", "Renee DiResta", "MKBHD", "My First Million"][i],
  followers: `${(Math.random() * 5 + 1).toFixed(1)}M`,
  podcasts: Math.floor(Math.random() * 200 + 50),
  isVerified: true,
  image: `https://i.pravatar.cc/150?img=${i + 10}`
}));

export function TopCreators() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-secondary font-bold text-white mb-8 tracking-wide">Top Creators</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {CREATORS.map((creator) => (
          <div 
            key={creator.id}
            className="group relative liquid-glass rounded-[2rem] p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:border-white/20 hover:shadow-[0_0_30px_rgba(8,145,178,0.15)] hover:bg-white/[0.03]"
          >
            {/* Profile Pic */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative ring-4 ring-transparent group-hover:ring-cyan-500/20 transition-all">
              <img 
                src={creator.image} 
                alt={creator.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex items-center gap-1 mb-1 justify-center w-full">
              <h4 className="text-white font-sans font-semibold text-lg truncate">
                {creator.name}
              </h4>
              {creator.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              )}
            </div>

            <div className="flex items-center gap-3 mt-3 text-xs text-white/50 font-sans font-medium">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" /> {creator.followers}
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-1">
                <Mic className="w-3 h-3" /> {creator.podcasts}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

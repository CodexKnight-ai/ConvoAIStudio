'use client';

import React from 'react';

interface BeamsBackgroundProps {
  heading: string;
  subheading: string;
}

export function BeamsBackground({ heading, subheading }: BeamsBackgroundProps) {
  return (
    <div className="absolute inset-0 bg-black flex flex-col justify-center px-12 z-0 overflow-hidden w-full h-full border-r border-white/5">
      {/* Decorative Glow Blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-900/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-purple-900/10 blur-[90px] pointer-events-none" />

      {/* Decorative Dots */}
      <div className="absolute top-[10%] left-[10%] w-1.5 h-1.5 rounded-full bg-cyan-400/25 animate-pulse" />
      <div className="absolute top-[40%] right-[20%] w-1 h-1 rounded-full bg-purple-400/30 animate-pulse" style={{ animationDelay: '0.8s' }} />
      <div className="absolute bottom-[15%] left-[25%] w-2 h-2 rounded-full bg-blue-400/20 animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-md space-y-4">
        <h2 className="text-4xl font-bold font-primary text-white tracking-wide leading-tight">
          {heading}
        </h2>
        <p className="text-white/50 font-sans text-base leading-relaxed">
          {subheading}
        </p>
      </div>
    </div>
  );
}

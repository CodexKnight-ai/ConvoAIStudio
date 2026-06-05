'use client';

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16">
      {/* Left Logo (with futuristic Qube Genix primary font) */}
      <Link href="/" className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white text-2xl font-primary font-bold shadow-lg border border-white/20 cursor-pointer hover:bg-white/10 transition">
        C
      </Link>
      
      {/* Center (desktop only) */}
      <div className="hidden lg:flex items-center gap-1.5 bg-black/80 rounded-full px-2.5 py-1.5 shadow-lg border border-white/30">
        <Link href="/" className="px-3 py-2 text-sm font-medium text-white/90 font-sans hover:text-white transition whitespace-nowrap">Home</Link>
        {/* <Link href="/episodes" className="px-3 py-2 text-sm font-medium text-white/90 font-sans hover:text-white transition whitespace-nowrap">Episodes</Link> */}
        <Link href="/discover" className="px-3 py-2 text-sm font-medium text-white/90 font-sans hover:text-white transition whitespace-nowrap">Discover</Link>
        <Link href="/feed" className="px-3 py-2 text-sm font-medium text-white/90 font-sans hover:text-white transition whitespace-nowrap">Feed</Link>
        <Link href="/channels" className="px-3 py-2 text-sm font-medium text-white/90 font-sans hover:text-white transition whitespace-nowrap">Channels</Link>
        {/* <Link href="/hosts" className="px-3 py-2 text-sm font-medium text-white/90 font-sans hover:text-white transition whitespace-nowrap">AI Hosts</Link> */}
        {/* <Link href="/live" className="px-3 py-2 text-sm font-medium text-white/90 font-sans hover:text-white transition mr-3 whitespace-nowrap">Live Stream</Link> */}
        <button className="bg-white text-black text-sm font-bold font-secondary rounded-full px-5 py-2 flex items-center gap-1 hover:bg-white/90 cursor-pointer">
          Listen Live
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* Right invisible spacer */}
      <div className="w-12 h-12 invisible"></div>
    </nav>
  );
}

'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [heroHeight, setHeroHeight] = useState(0);

    useEffect(() => {
        // Calculate hero section height on mount
        const hero = document.querySelector('.hero-section');
        if (hero) {
            setHeroHeight(hero.scrollHeight);
        }

        const handleScroll = () => {
            // Check if scrolled past hero section
            const scrolled = window.scrollY > heroHeight - 80; // 80 is the navbar height
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [heroHeight]);

    return (
<nav
  className={`px-12 w-full h-16 transition-all duration-300 ${
    isScrolled
      ? 'fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-md'
      : 'absolute bottom-16 z-50 left-0 right-0 bg-transparent'
  }`}
>
  <div className="container mx-auto h-full px-4 flex items-center justify-between relative z-[999]">
    {/* Left: Logo */}
    <div className="flex-1">
      <Link href="/" className="text-xl font-primary font-bold hover:text-blue-600 transition-colors text-center w-full px-auto">
        ConvoAI Studio
      </Link>
    </div>

    {/* Center: Nav Links */}
    <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
      <Link href="/"  className={`hover:text-blue-600 transition-colors border ${!isScrolled ? 'border-gray-400' : 'border-transparent'} px-5 py-2 rounded-3xl text-md `}>Home</Link>
      <Link href="/feed" className={`hover:text-blue-600 transition-colors border ${!isScrolled ? 'border-gray-400' : 'border-transparent'} px-5 py-2 rounded-3xl text-md `}>Feed</Link>
      <Link href="/subscription" className={`hover:text-blue-600 transition-colors border ${!isScrolled ? 'border-gray-400' : 'border-transparent'} px-5 py-2 rounded-3xl text-md `}>Subscriptions</Link>
      <Link href="/watch-history" className={`hover:text-blue-600 transition-colors border ${!isScrolled ? 'border-gray-400' : 'border-transparent'} px-5 py-2 rounded-3xl text-md `}>Watch History</Link>
    </div>

    {/* Right: Empty div to balance */}
    <div className="flex-1" />
  </div>
</nav>

    );
}

'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const updateHeroHeight = () => {
      const hero = document.querySelector('.hero-section');
      if (hero) {
        setHeroHeight(hero.scrollHeight);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = heroHeight ? heroHeight - 80 : 200; // fallback value
      setIsScrolled(scrollY > threshold);
    };

    updateHeroHeight(); // Initial measure
    handleScroll(); // Trigger immediately on mount

    window.addEventListener('resize', updateHeroHeight);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', updateHeroHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroHeight, pathname]);

  return (
    <nav
      className={`px-12 w-full h-16 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-md'
          : 'absolute bottom-16 z-50 left-0 right-0 bg-transparent'
      }`}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between relative z-[999]">
        <div className="flex-1">
          <Link
            href="/"
            className="text-xl font-primary font-bold hover:text-blue-600 transition-colors text-center w-full px-auto"
          >
            ConvoAI Studio
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          {[
            { href: '/', label: 'Home' },
            { href: '/feed', label: 'Feed' },
            { href: '/subscription', label: 'Subscriptions' },
            { href: '/profile', label: 'My Profile' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-blue-600 transition-colors border ${
                !isScrolled && isHomePage ? 'border-gray-400' : 'border-transparent'
              } px-5 py-2 rounded-3xl text-md`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex-1" />
      </div>
    </nav>
  );
}

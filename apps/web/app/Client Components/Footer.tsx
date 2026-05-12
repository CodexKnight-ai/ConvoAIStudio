'use client';


import {Mic2 } from 'lucide-react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6';

import Link from 'next/link';

const navigation = {
  main: [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    { name: 'Twitter', href: '#', icon: FaTwitter },
    { name: 'GitHub', href: '#', icon: FaGithub },
    { name: 'LinkedIn', href: '#', icon: FaLinkedin },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Mic2 className="h-5 w-5 text-cyan-400" />
              <span className="text-lg font-bold text-white">ConvoAI Studio</span>
            </div>
            <p className="text-sm leading-5">
              AI-powered live podcasts. Real-time interaction, smart conversations, and unforgettable audio experiences.
            </p>
            <div className="flex space-x-4 mt-3">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noreferrer">
                  <item.icon className="h-4 w-4 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-sm mb-3">Join the waitlist for early access + updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-sm bg-gray-900 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-cyan-600 text-white rounded-r-md hover:bg-cyan-500"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 text-xs text-center text-gray-500">
          &copy; {new Date().getFullYear()} ConvoAI Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

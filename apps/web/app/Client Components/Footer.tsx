'use client';

import Link from 'next/link';
import {
  Mic2,
  ArrowRight,
} from 'lucide-react';

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaYoutube,
} from 'react-icons/fa6';

const footerLinks = {
  product: [
    'Discover',
    'Feed',
    'Channels',
    'Live Podcasts',
    'Trending',
    'Categories',
    'AI Recommendations',
  ],
  resources: [
    'Documentation',
    'API',
    'Developer Portal',
    'Blog',
    'Community',
    'Changelog',
    'Status',
  ],
  company: [
    'About',
    'Careers',
    'Contact',
    'Privacy Policy',
    'Terms of Service',
    'Security',
    'Press Kit',
  ],
};

const categories = [
  'AI',
  'Technology',
  'Startups',
  'Business',
  'Finance',
  'Science',
  'Education',
  'Productivity',
];

const socials = [
  {
    icon: FaTwitter,
    href: '#',
    label: 'Twitter',
  },
  {
    icon: FaGithub,
    href: '#',
    label: 'GitHub',
  },
  {
    icon: FaLinkedin,
    href: '#',
    label: 'LinkedIn',
  },
  {
    icon: FaDiscord,
    href: '#',
    label: 'Discord',
  },
  {
    icon: FaYoutube,
    href: '#',
    label: 'YouTube',
  },
];

export default function Footer() {
  return (
    <>
      {/* FOOTER */}
      <footer className="border-t border-zinc-800 bg-black">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl border border-zinc-800 p-3">
                  <Mic2 className="h-5 w-5 text-white" />
                </div>

                <span className="text-xl font-semibold text-white">
                  ConvoAI Studio
                </span>
              </div>

              <p className="max-w-md text-sm leading-7 text-zinc-400">
                Create, stream, and experience AI-powered conversations at scale.
                Empower creators with intelligent podcasting tools and real-time
                audience engagement.
              </p>

              {/* Socials */}
              <div className="mt-8 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all hover:border-zinc-600 hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                Product
              </h3>

              <ul className="space-y-3">
                {footerLinks.product.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                Resources
              </h3>

              <ul className="space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-zinc-400 transition hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
                Stay Updated
              </h3>

              <p className="mb-4 text-sm text-zinc-400">
                Product updates, new features and creator insights.
              </p>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mb-3 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-600"
                />

                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 flex flex-col gap-5 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© 2026 ConvoAI Studio. All rights reserved.</p>

            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span>Built by</span>

              <a
                href="https://www.linkedin.com/in/subrat-jain-70078b267"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-300 transition hover:text-white"
              >
                Subrat Jain
              </a>

              <a
                href="https://github.com/CodexKnight-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition hover:text-white"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-full border border-zinc-800 px-3 py-1">
              v1.0.0-beta
            </div>
          </div>
        </div>
      </footer>
   </>
  );
}
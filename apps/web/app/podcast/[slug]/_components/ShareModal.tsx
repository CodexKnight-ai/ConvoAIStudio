'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
  FaTelegram,
  FaRedditAlien,
} from 'react-icons/fa6';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ShareModal({ isOpen, onClose, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const socials = [
    {
      name: 'X',
      icon: <FaXTwitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out this podcast: "${title}"`
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-zinc-800 hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-700 hover:text-white',
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-5 h-5" />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `Check out this podcast: "${title}" ${shareUrl}`
      )}`,
      color: 'hover:bg-green-600 hover:text-white',
    },
    {
      name: 'Telegram',
      icon: <FaTelegram className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
        `Check out this podcast: "${title}"`
      )}`,
      color: 'hover:bg-sky-500 hover:text-white',
    },
    {
      name: 'Reddit',
      icon: <FaRedditAlien className="w-5 h-5" />,
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(
        title
      )}`,
      color: 'hover:bg-orange-600 hover:text-white',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative w-full max-w-lg liquid-glass-strong rounded-3xl border border-white/10 p-6 shadow-2xl z-10 bg-zinc-950 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-secondary font-bold text-white tracking-wide">
                Share Conversation
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 text-white/70 transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                  <span className="text-xs font-sans font-medium">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Copy Link Input */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-sans font-semibold text-white/50">Direct Link</span>
              <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/5 border border-white/5">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white/80 outline-none truncate"
                />
                <button
                  onClick={copyLink}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold font-sans flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

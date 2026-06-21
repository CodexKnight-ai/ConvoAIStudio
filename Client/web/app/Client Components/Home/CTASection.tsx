'use client';

import { motion } from 'framer-motion';
import { MailOpen, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-black py-24 px-6 md:px-12">
      <motion.div
        className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-cyan-800 rounded-2xl shadow-lg p-10 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-secondary">
          Ready to Join the Future of AI Podcasting?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Be among the first to experience ConvoAIStudio — subscribe to exclusive channels or dive into our live AI podcast demo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/waitlist">
            <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-black px-6 py-3 rounded-full font-medium shadow-md transition">
              <MailOpen className="w-5 h-5" />
              Join Waitlist
            </button>
          </Link>

          <Link href="/demo">
            <button className="flex items-center gap-2 border border-cyan-600 text-cyan-400 px-6 py-3 rounded-full font-medium hover:bg-cyan-900/20 transition">
              <PlayCircle className="w-5 h-5" />
              Try Demo
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

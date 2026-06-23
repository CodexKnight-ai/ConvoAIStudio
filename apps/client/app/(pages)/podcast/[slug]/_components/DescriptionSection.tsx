'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type PodcastPreview } from '../../../feed/_data/feedData';

interface DescriptionSectionProps {
  podcast: PodcastPreview;
}

export function DescriptionSection({ podcast }: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="liquid-glass-strong rounded-2xl border border-white/5 p-4 md:p-6 transition-all duration-300">
      <div className="relative">
        {/* Scrollable/collapsible content */}
        <motion.div
          animate={{ height: isExpanded ? 'auto' : '100px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden relative"
        >
          {/* Main Description text formatting */}
          <div className="text-white/80 font-sans text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {podcast.description}
          </div>

          {/* Fade overlay when collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0e0e11] to-transparent pointer-events-none" />
          )}
        </motion.div>

        {/* Tags row */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/5"
          >
            {podcast.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-semibold font-sans px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Show more/less button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-1 mt-4 text-xs md:text-sm font-sans font-bold text-white/60 hover:text-white transition-colors py-1 cursor-pointer"
      >
        {isExpanded ? (
          <>
            <span>Show Less</span>
            <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            <span>Show More</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}

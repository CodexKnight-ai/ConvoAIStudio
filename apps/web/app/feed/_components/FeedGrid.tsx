'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PodcastPreviewCard } from './PodcastPreviewCard';
import { FeedSkeleton } from './FeedSkeleton';
import { getFeedPage, type FeedFilter, type PodcastPreview } from '../_data/feedData';

interface FeedGridProps {
  activeFilter: FeedFilter;
}

export function FeedGrid({ activeFilter }: FeedGridProps) {
  const [podcasts, setPodcasts] = useState<PodcastPreview[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  // Intersection observer target for scroll load trigger
  const observerTarget = useRef<HTMLDivElement>(null);

  // Reset grid when filter changes
  useEffect(() => {
    setIsLoading(true);
    const initialData = getFeedPage(0, 12, activeFilter);
    setPodcasts(initialData.podcasts);
    setPage(0);
    setHasMore(initialData.hasMore);
    setIsLoading(false);
    setActiveVideoId(null);
  }, [activeFilter]);

  // Load more function
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    // Simulate network delay for a smoother premium loading feel
    setTimeout(() => {
      const nextPage = page + 1;
      const data = getFeedPage(nextPage, 8, activeFilter);
      setPodcasts((prev) => [...prev, ...data.podcasts]);
      setPage(nextPage);
      setHasMore(data.hasMore);
      setIsLoading(false);
    }, 600);
  }, [page, isLoading, hasMore, activeFilter]);

  // Infinite Scroll Intersection Observer Setup
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => {
      observer.unobserve(target);
    };
  }, [loadMore, hasMore]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {podcasts.map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            >
              <PodcastPreviewCard
                podcast={podcast}
                isPlayingVideo={activeVideoId === podcast.id}
                onHoverStart={() => setActiveVideoId(podcast.id)}
                onHoverEnd={() => setActiveVideoId(null)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading & Infinite Scroll Target */}
      <div ref={observerTarget} className="w-full py-12 flex justify-center">
        {isLoading && <FeedSkeleton count={4} />}
        {!hasMore && podcasts.length > 0 && (
          <p className="text-white/30 text-sm font-sans italic mt-4">
            You've caught up with all the conversations.
          </p>
        )}
        {podcasts.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-white mb-1">No podcasts found</h3>
            <p className="text-white/40 text-sm max-w-xs">
              We couldn't find any podcasts in this category. Try another filter!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

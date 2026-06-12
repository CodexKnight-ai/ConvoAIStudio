'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { type PodcastPreview } from '../_data/feedData';

interface PodcastPreviewCardProps {
  podcast: PodcastPreview;
  isPlayingVideo: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function PodcastPreviewCard({
  podcast,
  isPlayingVideo,
  onHoverStart,
  onHoverEnd,
}: PodcastPreviewCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Play / Pause video based on isPlayingVideo prop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingVideo) {
      video.muted = isMuted;
      video.play().catch((err) => {
        // Handle autoplay blocking or abort errors gracefully
        console.warn('Autoplay failed or was interrupted:', err);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isPlayingVideo, isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  return (
    <Link href={`/podcast/${podcast.slug}`} className="block group">
      <motion.div
        className="relative bg-[#0d0d0d] border border-white/5 hover:border-white/20 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(8,145,178,0.2)] flex flex-col h-full"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        {/* Video / Thumbnail Area */}
        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-zinc-900 group-hover:scale-[1.02] transition-transform duration-300">
          {/* Thumbnail Image */}
          <img
            src={podcast.thumbnail}
            alt={podcast.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlayingVideo ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
          />

          {/* Looping Video Preview */}
          {isPlayingVideo && (
            <video
              ref={videoRef}
              src={podcast.previewVideo}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              playsInline
              muted={isMuted}
            />
          )}

          {/* Floating Badges - Top Left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {podcast.badges.map((badge) => {
              if (badge === 'trending') {
                return (
                  <span
                    key={badge}
                    className="text-[10px] font-bold font-sans uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-600/80 border border-cyan-400/30 text-white backdrop-blur-sm"
                  >
                    🔥 Trending
                  </span>
                );
              }
              if (badge === 'live') {
                return (
                  <span
                    key={badge}
                    className="text-[10px] font-bold font-sans uppercase tracking-wider px-2 py-0.5 rounded bg-red-600/80 border border-red-400/30 text-white backdrop-blur-sm flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </span>
                );
              }
              if (badge === 'ai-generated') {
                return (
                  <span
                    key={badge}
                    className="text-[10px] font-bold font-sans uppercase tracking-wider px-2 py-0.5 rounded bg-purple-600/80 border border-purple-400/30 text-white backdrop-blur-sm"
                  >
                    🤖 AI Generated
                  </span>
                );
              }
              if (badge === 'new-episode') {
                return (
                  <span
                    key={badge}
                    className="text-[10px] font-bold font-sans uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600/80 border border-emerald-400/30 text-white backdrop-blur-sm"
                  >
                    ✨ New
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Duration Badge - Bottom Right */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 border border-white/10 text-white text-xs font-medium backdrop-blur-sm z-10">
            {podcast.duration}
          </div>

          {/* Mute Control Overlay - Top Right */}
          {isPlayingVideo && (
            <button
              onClick={toggleMute}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 flex items-center justify-center text-white transition-colors z-20"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Metadata section */}
        <div className="flex gap-3 flex-1">
          {/* Channel Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mt-0.5 border border-white/10">
            <img src={podcast.channelAvatar} alt={podcast.channelName} className="w-full h-full object-cover" />
          </div>

          {/* Texts */}
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-white text-sm md:text-base line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
              {podcast.title}
            </h3>
            
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-white/60 font-sans text-xs md:text-sm truncate">
                {podcast.channelName}
              </span>
              {podcast.channelVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/10 flex-shrink-0" />
              )}
            </div>

            <div className="text-white/40 font-sans text-xs mt-1">
              {podcast.views} views • {podcast.uploadDate}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

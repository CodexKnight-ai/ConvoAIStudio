'use client';

import { useState } from 'react';
import { Heart, HeartOff, Share2, Bookmark, FolderPlus, ThumbsDown } from 'lucide-react';
import { type PodcastPreview } from '../../../feed/_data/feedData';
import { ShareModal } from './ShareModal';

interface EngagementActionsProps {
  podcast: PodcastPreview;
}

export function EngagementActions({ podcast }: EngagementActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-2">
      {/* Left side actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Like / Dislike Group */}
        <div className="flex items-center bg-white/5 border border-white/5 rounded-full p-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-sans font-semibold transition-all cursor-pointer ${isLiked
              ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'text-white/80 hover:bg-white/5'
              }`}
          >
            <Heart className={`w-4 h-4 transition-transform ${isLiked ? 'scale-125 fill-white' : ''}`} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>

          <div className="w-[1px] h-4 bg-white/10 mx-1" />

          <button
            onClick={handleDislike}
            className={`p-2 rounded-full text-white/80 hover:bg-white/5 transition-colors cursor-pointer ${isDisliked ? 'text-red-400' : ''
              }`}
            title="Dislike"
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={() => setIsShareOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-white/80 hover:bg-white/10 transition-colors text-sm font-sans font-semibold cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        {/* Save/Bookmark Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-white/80 hover:bg-white/10 transition-colors text-sm font-sans font-semibold cursor-pointer ${isSaved ? 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5' : ''
            }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-cyan-400' : ''}`} />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-white/80 hover:bg-white/10 transition-colors text-sm font-sans font-semibold cursor-pointer">
          <FolderPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add to Playlist</span>
        </button>
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={podcast.title}
      />
    </div>
  );
}

"use client";

import { CheckCircle2 } from "lucide-react";
import {
  type PodcastPreview,
  type BadgeType,
} from "../../../feed/_data/feedData";

interface PodcastInfoProps {
  podcast: PodcastPreview;
}

export function PodcastInfo({ podcast }: PodcastInfoProps) {
  return (
    <div className="space-y-4">
      {/* Badges row */}
      <div className="flex flex-wrap gap-2">
        {podcast.badges.map((badge: BadgeType) => {
          if (badge === "trending") {
            return (
              <span
                key={badge}
                className="text-xs font-bold font-sans uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 backdrop-blur-sm"
              >
                🔥 Trending
              </span>
            );
          }
          if (badge === "live") {
            return (
              <span
                key={badge}
                className="text-xs font-bold font-sans uppercase tracking-wider px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 backdrop-blur-sm flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE
              </span>
            );
          }
          if (badge === "ai-generated") {
            return (
              <span
                key={badge}
                className="text-xs font-bold font-sans uppercase tracking-wider px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 backdrop-blur-sm"
              >
                🤖 AI Generated
              </span>
            );
          }
          if (badge === "new-episode") {
            return (
              <span
                key={badge}
                className="text-xs font-bold font-sans uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 backdrop-blur-sm"
              >
                ✨ New Episode
              </span>
            );
          }
          return null;
        })}

        {/* Category badge */}
        <span className="text-xs font-bold font-sans uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 text-white/70">
          {podcast.category}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-sans leading-tight text-white">
        {podcast.title}
      </h1>

      {/* Visual stats and views */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/50 font-sans text-sm md:text-base border-b border-white/5 pb-4">
        <span className="font-semibold text-white/80">
          {podcast.views} views
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
        <span>Published {podcast.uploadDate}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
        <span className="text-cyan-400">{podcast.likes} Likes</span>
      </div>
    </div>
  );
}

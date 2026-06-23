"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getChannelBySlug, type ChannelData } from "./_data/channelData";
import { ChannelHeroBanner } from "./_components/ChannelHeroBanner";
import { FeaturedPodcasts } from "./_components/FeaturedPodcasts";
import { AllPodcasts } from "./_components/AllPodcasts";
import { ChannelEmptyState } from "./_components/ChannelEmptyState";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Skeleton Loader ───────────────────────────────────────────
function ChannelSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Banner skeleton */}
      <div className="relative w-full h-[420px] bg-white/[0.03] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-20 flex flex-col gap-6">
          <div className="w-24 h-6 rounded-full bg-white/5" />
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-2xl bg-white/8" />
            <div className="flex flex-col gap-3">
              <div className="w-64 h-8 rounded-lg bg-white/8" />
              <div className="w-96 h-4 rounded-lg bg-white/5" />
              <div className="w-80 h-4 rounded-lg bg-white/5" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-32 h-4 rounded-lg bg-white/5" />
            <div className="w-28 h-4 rounded-lg bg-white/5" />
            <div className="w-36 h-4 rounded-lg bg-white/5" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-11 rounded-xl bg-white/8" />
            <div className="w-24 h-11 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.03] overflow-hidden"
            >
              <div className="w-full aspect-video bg-white/5" />
              <div className="p-5 flex flex-col gap-3">
                <div className="w-4/5 h-5 rounded bg-white/8" />
                <div className="w-full h-4 rounded bg-white/5" />
                <div className="w-3/5 h-4 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Not Found ─────────────────────────────────────────────────
function ChannelNotFound({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <span className="text-6xl">📡</span>
        <h2 className="text-2xl font-bold font-secondary">Channel Not Found</h2>
        <p className="text-white/40 font-sans">
          The channel &quot;{slug}&quot; doesn&apos;t exist or may have been
          removed.
        </p>
        <Link
          href="/channels"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-sans font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Channels
        </Link>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────
export default function ChannelPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [channel, setChannel] = useState<ChannelData | null | undefined>(
    undefined,
  );

  useEffect(() => {
    // Simulate async data fetch
    const timer = setTimeout(() => {
      const data = getChannelBySlug(slug);
      setChannel(data ?? null);
    }, 400);
    return () => clearTimeout(timer);
  }, [slug]);

  // Loading
  if (channel === undefined) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 overflow-x-hidden">
        <ChannelSkeleton />
      </div>
    );
  }

  // Not found
  if (channel === null) {
    return <ChannelNotFound slug={slug} />;
  }

  const hasPodcasts = channel.podcasts.length > 0;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-cyan-500/30">
      <title>{`${channel.name} | ConvoAI Studio`}</title>
      <meta name="description" content={channel.description.slice(0, 155)} />

      {/* ── Global decorative background ── */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[30%] left-[-5%] w-[35%] h-[35%] rounded-full bg-cyan-900/4 blur-[130px]" />
        <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-900/4 blur-[110px]" />
        <div className="absolute bottom-[5%] left-[35%] w-[25%] h-[20%] rounded-full bg-blue-900/3 blur-[100px]" />
      </div>

      <main>
        {/* 1. Hero Banner */}
        <div className="pt-16">
          <ChannelHeroBanner channel={channel} />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Content */}
        {hasPodcasts ? (
          <>
            {/* 2. Featured Podcasts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FeaturedPodcasts podcasts={channel.podcasts} />
            </motion.div>

            {/* Section separator */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
              <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            </div>

            {/* 3. All Podcasts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <AllPodcasts podcasts={channel.podcasts} />
            </motion.div>
          </>
        ) : (
          /* 4. Empty State */
          <ChannelEmptyState />
        )}

        {/* Back to Channels link */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-16 pt-4">
          <Link
            href="/channels"
            className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors text-sm font-sans group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Channels
          </Link>
        </div>
      </main>
    </div>
  );
}

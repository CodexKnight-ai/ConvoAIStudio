'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPodcastBySlug, type PodcastPreview } from '../../feed/_data/feedData';
import { PodcastVideoPlayer } from './_components/PodcastVideoPlayer';
import { PodcastInfo } from './_components/PodcastInfo';
import { EngagementActions } from './_components/EngagementActions';
import { ChannelSection } from './_components/ChannelSection';
import { DescriptionSection } from './_components/DescriptionSection';
import { CommentsSection } from './_components/CommentsSection';
import { RelatedSidebar } from './_components/RelatedSidebar';
import { PlayerSkeleton } from '../../feed/_components/FeedSkeleton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PodcastDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [podcast, setPodcast] = useState<PodcastPreview | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate slight loading to showcase the skeleton loader
    const timer = setTimeout(() => {
      const data = getPodcastBySlug(slug);
      setPodcast(data);
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <PlayerSkeleton />
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <span className="text-6xl">🎙️</span>
          <h2 className="text-2xl font-bold font-secondary">Conversation Not Found</h2>
          <p className="text-white/40 font-sans max-w-md">
            The conversation you're looking for might have been archived or deleted.
          </p>
          <Link
            href="/feed"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-sans font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Feed</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden selection:bg-cyan-500/30">
      <title>{`${podcast.title} | ConvoAI Studio`}</title>
      <meta name="description" content={podcast.description.slice(0, 150)} />

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-cyan-900/5 blur-[130px]" />
        <div className="absolute top-[40%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-900/5 blur-[110px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/feed"
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors mb-6 text-sm font-sans font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Feed</span>
        </Link>

        {/* Dynamic 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
            <PodcastVideoPlayer videoUrl={podcast.previewVideo} posterUrl={podcast.thumbnail} />
            <PodcastInfo podcast={podcast} />
            <EngagementActions podcast={podcast} />
            <ChannelSection podcast={podcast} />
            <DescriptionSection podcast={podcast} />
            
            {/* Divider line before comments */}
            <div className="h-[1px] bg-white/5 my-8" />
            
            <CommentsSection />
          </div>

          {/* Related Sidebar (Right Column) */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-8">
            <RelatedSidebar currentSlug={podcast.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}

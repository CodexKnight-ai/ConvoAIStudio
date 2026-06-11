'use client';

import { useState } from 'react';
import { FeedHero } from './_components/FeedHero';
import { FeedFilters } from './_components/FeedFilters';
import { FeedGrid } from './_components/FeedGrid';
import { type FeedFilter } from './_data/feedData';

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('For You');

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden selection:bg-cyan-500/30">
      <title>Conversations Feed | ConvoAI Studio</title>
      <meta name="description" content="Explore AI-generated conversations, trending debates, and fresh podcast episodes in our interactive Feed." />

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[15%] left-[-10%] w-[35%] h-[35%] rounded-full bg-cyan-900/5 blur-[120px]" />
        <div className="absolute top-[50%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-900/5 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[25%] h-[25%] rounded-full bg-blue-900/4 blur-[110px]" />
      </div>

      <main className="flex flex-col gap-4">
        {/* Hero Section */}
        <section>
          <FeedHero />
        </section>

        {/* Sticky Filter Bar */}
        <section className="sticky top-16 z-30">
          <FeedFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </section>

        {/* Podcast Feed Grid */}
        <section className="relative z-10">
          <FeedGrid activeFilter={activeFilter} />
        </section>
      </main>
    </div>
  );
}

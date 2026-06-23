import { SearchHero } from './_components/SearchHero';
import { CategoryFilters } from './_components/CategoryFilters';
import { Top3Trending } from './_components/Top3Trending';
import { Top12Trending } from './_components/Top12Trending';
import { TopCreators } from './_components/TopCreators';
import { RegionalSection } from './_components/RegionalSection';

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/5 blur-[120px]" />
      </div>

      <main className="flex flex-col gap-8 md:gap-16">
        <section>
          <SearchHero />
        </section>

        <section>
          <CategoryFilters />
        </section>

        <section>
          <Top3Trending />
        </section>

        <section>
          <Top12Trending />
        </section>

        <section className="bg-gradient-to-b from-transparent via-[#0a0f25]/50 to-transparent py-12">
          <TopCreators />
        </section>

        <section>
          <RegionalSection />
        </section>
      </main>
    </div>
  );
}

import { ChannelsHero } from './_components/ChannelsHero';
import { ActivityHub } from './_components/ActivityHub';
import { SubscribedChannels } from './_components/SubscribedChannels';

export default function ChannelsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[15%] left-[-10%] w-[35%] h-[35%] rounded-full bg-cyan-900/5 blur-[120px]" />
        <div className="absolute top-[50%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-900/5 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[25%] h-[25%] rounded-full bg-blue-900/4 blur-[110px]" />
      </div>

      <main className="flex flex-col gap-8 md:gap-16">
        <section>
          <ChannelsHero />
        </section>

        <section>
          <ActivityHub />
        </section>

        <section className="bg-gradient-to-b from-transparent via-[#0a0f25]/30 to-transparent py-8">
          <SubscribedChannels />
        </section>
      </main>
    </div>
  );
}

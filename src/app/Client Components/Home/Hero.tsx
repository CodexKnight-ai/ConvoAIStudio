'use client'

import React from 'react';
import Spline from './SplineComponent';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const router = useRouter();
    return (
        <section className="hero-section relative w-[96vw] h-[90vh] my-8 overflow-hidden mx-auto rounded-3xl">
            <div className="absolute inset-0 z-0 w-full h-full bg-mask bg-gradient-to-r from-gray-950 to-gray-900">
                <div className="w-full h-full">
                  <Spline
                    scene="https://prod.spline.design/8qaHYedm72SB7LOm/scene.splinecode"
                    onLoad={() => {
                      console.log('Spline loaded successfully');
                    }}
                    onError={(error: Error) => {
                      console.error('Spline error:', error);
                    }}
                    className="w-full h-full"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                
            </div>


            {/* Content Layer */}
            <div className="absolute inset-0 z-10 p-6  flex flex-col justify-between text-white">
                {/* Top Bar */}
                <div className="relative top-4 flex flex-col sm:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-5xl sm:text-6xl font-bold leading-tight font-primary">
                            ConvoAI Studio
                        </h1>
                        <p className="text-gray-400 font-sans text-2xl mt-2 ">
                            Two AIs. One Mic. Infinite Possibilities.
                        </p>
                    </div>
                    <button onClick={() => router.push('/login')} className="font-secondary hidden sm:block absolute right-0 -top-6 w-[370px] rounded-full border border-gray-500 px-12 py-4 text-xl hover:bg-white hover:text-black transition">
                        Get Started
                    </button>
                </div>

                {/* Right side boxes */}
                <aside className="absolute right-8 top-1/2 transform -translate-y-1/2">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center gap-2 bg-gray-950 w-[380px] p-4 rounded-2xl">
                            <h2 className="text-xl font-bold font-secondary">AI-Driven Conversations That Sound Human</h2>
                            <p className="text-gray-400 font-sans text-md mt-2">Two AI hosts simulate natural, emotional conversations—delivering podcast-quality dialogue indistinguishable from human speakers, in real time.</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 bg-gray-950 w-[380px] p-4 rounded-2xl">
                            <h2 className="text-xl font-bold font-secondary">Real-Time Audience Interaction & Reactions</h2>
                            <p className="text-gray-400 font-sans text-md mt-2">Unlike static AI content, users can interact with the AI hosts live through chat, emoji reactions, and real-time Q&A — creating a dynamic, participatory podcast experience.</p>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    )
}

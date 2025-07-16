// app/components/Hero.tsx or wherever you prefer
'use client'

import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
    return (
        <section className="relative w-[96vw] h-[90vh] my-8 overflow-hidden mx-auto rounded-3xl">
            {/* Background Image */}
            <main className="absolute inset-0 z-0 w-full h-full object-cover bg-mask bg-gradient-to-r from-gray-950 to-gray-900">
                <Spline
                    scene="https://prod.spline.design/8qaHYedm72SB7LOm/scene.splinecode"
                />
            </main>


            {/* Content Layer */}
            <div className="absolute inset-0 z-10 p-6  flex flex-col justify-between text-white">
                {/* Top Bar */}
                <div className="relative top-4 flex flex-col sm:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-5xl sm:text-6xl font-bold leading-tight font-primary">
                            ConvoAI Studio
                        </h1>
                        <p className="text-gray-400 font-sans text-2xl mt-2">
                            Two AIs. One Mic. Infinite Possibilities.
                        </p>
                    </div>
                    <button className="hidden sm:block absolute right-0 -top-5 w-[370px] rounded-full border border-gray-500 px-12 py-4 text-sm hover:bg-white hover:text-black transition">
                        Get Started
                    </button>
                </div>

                {/* Center Sphere Placeholder */}
                {/* <main className='h-full w-full'>
                    <Spline
                        scene="https://prod.spline.design/Bb2SJVIqIvBDC2-7/scene.splinecode"
                    />
                </main> */}

                {/* Bottom Navigation */}
                <div className="flex justify-between items-end text-sm h-16 text-gray-400">
                    <span>UNMATCHED SOUND QUALITY</span>
                    <div className="space-x-6 hidden sm:flex sm:justify-between">
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Shop</a>
                        <a href="#">FAQ</a>
                    </div>
                    <span>BUY NOW</span>
                </div>
            </div>
        </section>
    )
}

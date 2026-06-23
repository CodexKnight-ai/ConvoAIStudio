"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Suppress benign Framer Motion dev warnings about keys
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("Framer Motion")
    ) {
      return;
    }
    originalError(...args);
  };
}

// Inline custom SVGs
function ArrowUpRightIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

// PlayIcon (24x24 filled polygon)
function PlayIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="6,4 20,12 6,20 6,4" />
    </svg>
  );
}

// FadingVideo component (custom JS crossfade, no CSS transitions)
interface FadingVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const fadingOutRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset state on source changes
    fadingOutRef.current = false;
    video.style.opacity = "0";
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55; // seconds

    const fadeTo = (target: number, duration: number = FADE_MS) => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      const startOpacity = parseFloat(video.style.opacity || "0");
      const opacityDiff = target - startOpacity;
      if (opacityDiff === 0) return;

      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentOpacity = startOpacity + opacityDiff * progress;
        video.style.opacity = currentOpacity.toString();

        if (progress < 1) {
          rafIdRef.current = requestAnimationFrame(animate);
        } else {
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(animate);
    };

    const handleLoadedData = () => {
      video.style.opacity = "0";
      video.play().catch((err) => console.log("Video play error:", err));
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      if (!duration || duration <= 0) return;

      const timeRemaining = duration - currentTime;
      if (
        !fadingOutRef.current &&
        timeRemaining <= FADE_OUT_LEAD &&
        timeRemaining > 0
      ) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        video
          .play()
          .then(() => {
            fadingOutRef.current = false;
            fadeTo(1);
          })
          .catch((err) => console.log("Video loop replay error:", err));
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  );
}

// BlurText component (word-by-word blur-in on 10% visibility)
interface BlurTextProps {
  text: string;
  className?: string;
}

export function BlurText({ text, className }: BlurTextProps) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.1,
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => {
        const delay = (i * 100) / 1000; // seconds

        return (
          <motion.span
            key={i}
            initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
            animate={
              isInView
                ? {
                    filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                    opacity: [0, 0.5, 1],
                    y: [50, -5, 0],
                  }
                : { filter: "blur(10px)", opacity: 0, y: 50 }
            }
            transition={{
              duration: 0.7,
              times: [0, 0.5, 1],
              ease: "easeOut",
              delay: delay,
            }}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

// Main Cinematic Space-Travel Hero Component
export default function Hero() {
  return (
    <div className="w-full min-h-screen bg-black text-white relative">
      {/* SECTION 1 — HERO (full viewport, black bg) */}
      <section
        id="home"
        className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between z-10 pt-24 px-4 pb-12"
      >
        {/* Loop background video (120% scale, centered, top-aligned) */}
        <FadingVideo
          src="https://cdn.pixabay.com/video/2023/09/23/182037-867576120_large.mp4"
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: "120%", height: "120%" }}
        />

        {/* Hero Content (flex-1, centered) */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
          {/* Badge */}
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="liquid-glass rounded-full flex items-center p-1.5 gap-3 max-w-fit shadow-md border border-white/5 mb-6"
          >
            <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full">
              New
            </span>
            <span className="text-sm text-white/90 pr-3 font-sans">
              Live AI-Generated Podcast Streamed 24/7
            </span>
          </motion.div>

          {/* Headline (using Qube Genix native font) */}
          <BlurText
            text="CONVO AI STUDIO"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-primary text-white leading-[0.9] max-w-4xl justify-center tracking-tight"
          />

          {/* Subheading */}
          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="mt-6 text-sm md:text-base text-white/90 max-w-2xl font-sans font-light leading-relaxed text-center"
          >
            Experience the world's first interactive autonomous AI podcast. Two
            AI hosts simulate natural, emotional, and captivating conversations
            in real time — shaped dynamically by audience interactions and live
            feedback.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
            className="flex items-center gap-6 mt-8"
          >
            <button className="liquid-glass-strong rounded-full px-6 py-3.5 text-sm font-bold font-secondary text-white flex items-center gap-2 hover:bg-white/5 transition shadow-lg cursor-pointer">
              Start Listening
              <ArrowUpRightIcon className="h-5 w-5" />
            </button>
            <a
              href="#demo"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition cursor-pointer font-sans"
            >
              Watch Demo
              <PlayIcon className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Stats row (with Netron numbers and sans description) */}
          {/* <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
            className="flex flex-col sm:flex-row items-stretch justify-center gap-4 mt-12 w-full max-w-lg"
          >
            <div className="liquid-glass p-5 w-full sm:w-[220px] rounded-[1.25rem] border border-white/5 flex flex-col justify-between text-left shadow-md">
              <div className="w-7 h-7 mb-6">
                <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-secondary text-white leading-none">
                  34.5 MIN
                </div>
                <div className="text-xs text-white font-sans font-light mt-2">
                  Average Session Duration
                </div>
              </div>
            </div>

            <div className="liquid-glass p-5 w-full sm:w-[220px] rounded-[1.25rem] border border-white/5 flex flex-col justify-between text-left shadow-md">
              <div className="w-7 h-7 mb-6">
                <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-secondary text-white leading-none">
                  2.8M+
                </div>
                <div className="text-xs text-white font-sans font-light mt-2">
                  Active Daily Listeners
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>

        {/* Partners (with tech and podcasting giants) */}
        {/* <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
          className="relative z-10 flex flex-col items-center gap-4 pb-8 mt-16 w-full"
        >
          <div className="liquid-glass rounded px-3.5 py-1 text-xs font-medium text-white border border-white/5 shadow-sm">
            Featured on leading platforms and integrations
          </div>
          <div className="flex flex-wrap justify-center items-center text-xl md:text-2xl font-primary text-white tracking-wide gap-12 md:gap-16">
            <span>Spotify</span>
            <span>YouTube</span>
            <span>Apple</span>
            <span>Audacity</span>
            <span>OpenAI</span>
          </div>
        </motion.div> */}
      </section>
    </div>
  );
}

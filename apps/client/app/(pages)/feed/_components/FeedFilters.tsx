"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FEED_FILTERS, type FeedFilter } from "../_data/feedData";

interface FeedFiltersProps {
  activeFilter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
}

export function FeedFilters({
  activeFilter,
  onFilterChange,
}: FeedFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl py-4">
      <div className="w-full max-w-7xl mx-auto px-4 relative">
        {/* Left fade + arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white hover:bg-white/10 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Filter pills */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar px-2"
        >
          {FEED_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`relative whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all duration-300 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-filter-pill"
                    className="absolute inset-0 liquid-glass-strong rounded-full border border-cyan-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>

        {/* Right fade + arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white hover:bg-white/10 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Search, X } from "lucide-react";

const CATEGORIES = [
  "Technology",
  "AI",
  "Science",
  "Business",
  "Startups",
  "Finance",
  "Education",
  "History",
  "Sports",
  "Politics",
  "Entertainment",
  "News",
];

export function CategoryFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCategories = CATEGORIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleCategory = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const removeCategory = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected((prev) => prev.filter((c) => c !== category));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-secondary font-bold text-white tracking-wide">
            Browse Categories
          </h2>
        </div>

        <div className="relative" ref={dropdownRef}>
          {/* Main Select Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full min-h-[56px] liquid-glass hover:bg-white/[0.03] rounded-2xl px-4 py-3 flex flex-wrap items-center gap-2 transition-colors text-left"
          >
            {selected.length === 0 ? (
              <span className="text-white/50 font-sans flex-1">
                Select categories...
              </span>
            ) : (
              <div className="flex flex-wrap gap-2 flex-1 z-10">
                {selected.map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-1 liquid-glass-strong text-white px-2.5 py-1 rounded-md text-sm font-sans"
                  >
                    {cat}
                    <X
                      className="w-3 h-3 text-white/70 hover:text-white cursor-pointer"
                      onClick={(e) => removeCategory(cat, e)}
                    />
                  </span>
                ))}
              </div>
            )}
            <ChevronDown
              className={`w-5 h-5 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-black/95 rounded-2xl shadow-2xl overflow-hidden z-30 flex flex-col max-h-80"
              >
                {/* Search inside dropdown */}
                <div className="p-3 relative z-10">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full liquid-glass rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans text-white focus:outline-none placeholder:text-white/40"
                  />
                </div>

                {/* Options List */}
                <div className="overflow-y-auto p-2 flex-1 custom-scrollbar z-10">
                  {filteredCategories.length === 0 ? (
                    <div className="py-8 text-center text-white/50 text-sm font-sans">
                      No categories found.
                    </div>
                  ) : (
                    filteredCategories.map((category) => {
                      const isSelected = selected.includes(category);
                      return (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans transition-colors ${
                            isSelected
                              ? "liquid-glass-strong text-white"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {category}
                          {isSelected && (
                            <Check className="w-4 h-4 text-cyan-400" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

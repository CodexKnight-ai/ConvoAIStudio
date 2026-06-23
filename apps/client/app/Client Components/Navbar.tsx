"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  User,
  History,
  Clock,
  Tv,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Left Logo & Brand */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-11 h-11 rounded-full liquid-glass flex items-center justify-center text-white text-xl font-primary font-bold shadow-lg border border-white/20 group-hover:border-cyan-500/40 transition-all duration-300">
          C
        </div>
        <span className="hidden md:inline text-white font-primary font-bold text-lg tracking-wider group-hover:text-cyan-400 transition-colors">
          ConvoAI
        </span>
      </Link>

      {/* Center Links (desktop only) */}
      <div className="hidden md:flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-2 py-1 shadow-lg border border-white/10">
        <Link
          href="/"
          className="px-4 py-2 text-xs font-semibold text-white/70 font-sans hover:text-white transition rounded-full hover:bg-white/5 whitespace-nowrap"
        >
          Home
        </Link>
        <Link
          href="/discover"
          className="px-4 py-2 text-xs font-semibold text-white/70 font-sans hover:text-white transition rounded-full hover:bg-white/5 whitespace-nowrap"
        >
          Discover
        </Link>
        <Link
          href="/feed"
          className="px-4 py-2 text-xs font-semibold text-white/70 font-sans hover:text-white transition rounded-full hover:bg-white/5 whitespace-nowrap"
        >
          Feed
        </Link>
        <Link
          href="/channels"
          className="px-4 py-2 text-xs font-semibold text-white/70 font-sans hover:text-white transition rounded-full hover:bg-white/5 whitespace-nowrap"
        >
          Channels
        </Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex bg-white text-black text-xs font-bold font-secondary rounded-full px-5 py-2.5 items-center gap-1 hover:bg-white/90 cursor-pointer shadow-lg transition-transform duration-200 active:scale-95">
          Listen Live
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        {isAuthenticated ? (
          /* Profile Dropdown Container */
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 transition cursor-pointer text-white"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs font-primary shadow">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-semibold font-sans max-w-[80px] truncate">
                {user?.username}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-white/60 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-56 rounded-2xl bg-[#0e1320] border border-white/10 p-1.5 shadow-2xl z-50 animate-fade-in">
                <div className="px-3 py-2.5 border-b border-white/5 mb-1.5">
                  <p className="text-xs text-white/40 font-sans">
                    Signed in as
                  </p>
                  <p className="text-sm font-semibold text-white truncate font-sans">
                    {user?.email}
                  </p>
                </div>

                <Link
                  href="/profile?tab=channels"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition font-sans"
                >
                  <Tv className="w-4 h-4 text-cyan-400" />
                  My Channels
                </Link>

                <Link
                  href="/profile?tab=history"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition font-sans"
                >
                  <History className="w-4 h-4 text-cyan-400" />
                  History
                </Link>

                <Link
                  href="/profile?tab=watch-later"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition font-sans"
                >
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Watch Later
                </Link>

                <div className="h-px bg-white/5 my-1.5" />

                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition font-sans cursor-pointer text-left"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-white/80 hover:text-white transition rounded-full hover:bg-white/5 whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition rounded-full border border-white/10 whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

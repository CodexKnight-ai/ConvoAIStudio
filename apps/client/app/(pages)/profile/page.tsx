"use client";

import { useEffect, useState, Suspense, type FormEvent } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Clock,
  Tv,
  Plus,
  AlertCircle,
  Check,
  Shield,
  Mail,
  User as UserIcon,
  Loader2,
  Globe,
  Lock,
  EyeOff,
} from "lucide-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/api";

interface Channel {
  id: string;
  name: string;
  slug: string;
  description: string;
  subscriberCount: number;
  podcastCount: number;
  visibility?: "PUBLIC" | "PRIVATE" | "UNLISTED";
  createdAt: string;
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  status: string;
  visibility: "PUBLIC" | "PRIVATE" | "UNLISTED";
  createdAt: string;
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}

function ProfileContent() {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<
    "history" | "watch-later" | "channels"
  >("channels");

  useEffect(() => {
    if (
      tabParam === "history" ||
      tabParam === "watch-later" ||
      tabParam === "channels"
    ) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Channels state
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [channelPodcasts, setChannelPodcasts] = useState<Podcast[]>([]);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [loadingChannelPodcasts, setLoadingChannelPodcasts] = useState(false);
  const [channelsError, setChannelsError] = useState<string | null>(null);

  // Create channel form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelVisibility, setChannelVisibility] = useState<
    "PUBLIC" | "PRIVATE" | "UNLISTED"
  >("PUBLIC");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Podcast creation state
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [podcastVisibility, setPodcastVisibility] = useState<
    "PUBLIC" | "PRIVATE" | "UNLISTED"
  >("PUBLIC");
  const [isPodcastSubmitting, setIsPodcastSubmitting] = useState(false);
  const [podcastError, setPodcastError] = useState<string | null>(null);
  const [podcastSuccess, setPodcastSuccess] = useState(false);

  // Sync auth state
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  // Fetch user's channels
  const fetchMyChannels = async () => {
    if (!user) return;
    setLoadingChannels(true);
    setChannelsError(null);
    try {
      const res = await axios.get(`${API_URL}/v1/channels/me`, {
        withCredentials: true,
      });
      setChannels(res.data || []);
    } catch (err: any) {
      console.error("Failed to load channels:", err);
      setChannelsError(
        err.response?.data?.message ||
          "Failed to retrieve your channels. Please make sure the server is running.",
      );
    } finally {
      setLoadingChannels(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && activeTab === "channels") {
      fetchMyChannels();
    }
  }, [isAuthenticated, user, activeTab]);

  const fetchChannelPodcasts = async (channelId: string) => {
    setLoadingChannelPodcasts(true);
    try {
      const response = await axios.get<Podcast[]>(
        `${API_URL}/v1/podcasts/channel/${channelId}`,
        {
          withCredentials: true,
        },
      );
      setChannelPodcasts(response.data || []);
    } catch (err: any) {
      console.error("Failed to load channel podcasts:", err);
      setChannelPodcasts([]);
    } finally {
      setLoadingChannelPodcasts(false);
    }
  };

  const selectChannel = async (channel: Channel) => {
    setSelectedChannel(channel);
    await fetchChannelPodcasts(channel.id);
  };

  const handleCreatePodcast = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedChannel) {
      setPodcastError("Select a channel first.");
      return;
    }
    if (!podcastTitle.trim()) {
      setPodcastError("Podcast title is required.");
      return;
    }

    setIsPodcastSubmitting(true);
    setPodcastError(null);
    setPodcastSuccess(false);

    try {
      await axios.post(
        `${API_URL}/v1/podcasts/podcast`,
        {
          title: podcastTitle,
          description: podcastDescription,
          channelId: selectedChannel.id,
          visibility: podcastVisibility,
        },
        { withCredentials: true },
      );

      setPodcastSuccess(true);
      setPodcastTitle("");
      setPodcastDescription("");
      setPodcastVisibility("PUBLIC");
      await fetchChannelPodcasts(selectedChannel.id);
    } catch (err: any) {
      console.error("Failed to create podcast:", err);
      setPodcastError(
        err.response?.data?.error || "Failed to publish podcast.",
      );
    } finally {
      setIsPodcastSubmitting(false);
    }
  };

  const handleCreateChannel = async (e: FormEvent) => {
    e.preventDefault();
    if (!channelName.trim() || !channelDescription.trim()) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await axios.post(
        `${API_URL}/v1/channels/`,
        {
          name: channelName,
          description: channelDescription,
          imageUrl: "",
          visibility: channelVisibility,
        },
        { withCredentials: true },
      );

      setSubmitSuccess(true);
      setChannelName("");
      setChannelDescription("");
      setChannelVisibility("PUBLIC");

      // Refresh list
      await fetchMyChannels();

      // Close modal after delay
      setTimeout(() => {
        setShowCreateModal(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err: any) {
      console.error("Error creating channel:", err);
      setSubmitError(
        err.response?.data?.message ||
          "Failed to create channel. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  // Generate slug preview
  const slugPreview = channelName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 md:px-8 selection:bg-cyan-500/30">
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-purple-900/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* User Card */}
        <div className="liquid-glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-4xl font-bold font-primary shadow-xl shadow-cyan-500/10">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold font-secondary tracking-wide flex items-center justify-center md:justify-start gap-2">
              {user.username}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {user.role}
              </span>
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-white/60 text-sm font-sans">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-purple-400" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-cyan-400" />
                ID: {user.id.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-px">
          {[
            { id: "channels", label: "My Channels", icon: Tv },
            { id: "history", label: "History", icon: History },
            { id: "watch-later", label: "Watch Later", icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium font-sans border-b-2 transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  active
                    ? "border-cyan-400 text-cyan-400 bg-white/[0.02]"
                    : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${active ? "text-cyan-400" : "text-white/40"}`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {/* My Channels Tab */}
            {activeTab === "channels" && (
              <motion.div
                key="channels"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-secondary">
                      Channels You Own
                    </h2>
                    <p className="text-sm text-white/40">
                      Manage your broadcast channels and publish podcasts.
                    </p>
                  </div>
                  {channels.length > 0 && (
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      Create Channel
                    </button>
                  )}
                </div>

                {loadingChannels ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    <span className="text-white/40 text-sm">
                      Loading your channels...
                    </span>
                  </div>
                ) : channelsError ? (
                  <div className="liquid-glass border border-red-500/20 rounded-2xl p-6 flex items-start gap-3 text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">
                        Error Loading Channels
                      </h4>
                      <p className="text-xs text-white/60 mt-1">
                        {channelsError}
                      </p>
                      <button
                        onClick={fetchMyChannels}
                        className="mt-3 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_0.9fr] gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {channels.map((channel) => {
                          const selected = selectedChannel?.id === channel.id;
                          return (
                            <button
                              key={channel.id}
                              type="button"
                              onClick={() => selectChannel(channel)}
                              className={`liquid-glass text-left w-full rounded-3xl p-6 border transition-all duration-300 overflow-hidden ${
                                selected
                                  ? "border-cyan-400 bg-cyan-500/10"
                                  : "border-white/10 hover:border-cyan-500/30"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="text-lg font-bold font-secondary text-white">
                                    {channel.name}
                                  </h3>
                                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
                                    /{channel.slug}
                                  </p>
                                </div>
                                <span
                                  className={`text-[10px] font-semibold px-2 py-1 rounded-full ${selected ? "bg-cyan-400/15 text-cyan-200" : "bg-white/5 text-white/50"}`}
                                >
                                  {selected ? "Selected" : "Select"}
                                </span>
                              </div>
                              <p className="mt-4 text-sm text-white/50 line-clamp-3 leading-relaxed">
                                {channel.description}
                              </p>
                              <div className="mt-5 flex items-center justify-between text-[11px] text-white/40">
                                <span>
                                  {channel.subscriberCount} subscribers
                                </span>
                                <span>{channel.podcastCount} podcasts</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="liquid-glass rounded-3xl border border-white/10 p-6 space-y-6">
                      {selectedChannel ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-bold font-secondary">
                                {selectedChannel.name}
                              </h3>
                              <p className="text-sm text-white/40">
                                Channel status and podcast publishing controls.
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-200 text-xs font-semibold">
                              <Tv className="w-3.5 h-3.5" />
                              {selectedChannel.visibility}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm text-white/70">
                            <div className="rounded-2xl bg-white/5 p-4">
                              <p className="text-2xl font-bold text-white">
                                {selectedChannel.subscriberCount}
                              </p>
                              <p className="text-xs text-white/50 mt-1">
                                Subscribers
                              </p>
                            </div>
                            <div className="rounded-2xl bg-white/5 p-4">
                              <p className="text-2xl font-bold text-white">
                                {selectedChannel.podcastCount}
                              </p>
                              <p className="text-xs text-white/50 mt-1">
                                Podcasts
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                              Channel description
                            </h4>
                            <p className="text-sm text-white/70 leading-relaxed">
                              {selectedChannel.description}
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold">
                                Latest podcasts
                              </h4>
                              <span className="text-xs text-white/50">
                                {channelPodcasts.length} items
                              </span>
                            </div>

                            {loadingChannelPodcasts ? (
                              <div className="flex items-center gap-2 text-sm text-white/50">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading podcasts...
                              </div>
                            ) : channelPodcasts.length === 0 ? (
                              <p className="text-sm text-white/50">
                                No podcasts have been published yet.
                              </p>
                            ) : (
                              <div className="space-y-3">
                                {channelPodcasts.slice(0, 3).map((podcast) => (
                                  <div
                                    key={podcast.id}
                                    className="rounded-2xl bg-white/5 p-3"
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <div>
                                        <p className="text-sm font-semibold text-white">
                                          {podcast.title}
                                        </p>
                                        <p className="text-xs text-white/40">
                                          {new Date(
                                            podcast.createdAt,
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                                        {podcast.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="rounded-3xl bg-cyan-500/5 border border-cyan-500/10 p-5">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
                                  Publish a new podcast
                                </p>
                                <p className="text-sm text-white/70">
                                  Add a new episode or AI conversation for this
                                  channel.
                                </p>
                              </div>
                              <Plus className="w-4 h-4 text-cyan-300" />
                            </div>
                            <form
                              onSubmit={handleCreatePodcast}
                              className="space-y-3 mt-4"
                            >
                              <input
                                type="text"
                                value={podcastTitle}
                                onChange={(event) =>
                                  setPodcastTitle(event.target.value)
                                }
                                placeholder="Podcast title"
                                className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                              />
                              <textarea
                                value={podcastDescription}
                                onChange={(event) =>
                                  setPodcastDescription(event.target.value)
                                }
                                placeholder="Episode description"
                                className="w-full min-h-[100px] rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
                              />
                              <div className="grid grid-cols-3 gap-2 text-xs text-white/70">
                                {[
                                  { id: "PUBLIC", label: "Public" },
                                  { id: "PRIVATE", label: "Private" },
                                  { id: "UNLISTED", label: "Unlisted" },
                                ].map((option) => (
                                  <button
                                    key={option.id}
                                    type="button"
                                    onClick={() =>
                                      setPodcastVisibility(option.id as any)
                                    }
                                    className={`rounded-2xl px-3 py-2 border text-center transition ${
                                      podcastVisibility === option.id
                                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                                    }`}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>

                              {podcastError && (
                                <div className="text-xs text-red-400">
                                  {podcastError}
                                </div>
                              )}
                              {podcastSuccess && (
                                <div className="text-xs text-emerald-300">
                                  Podcast creation started successfully.
                                </div>
                              )}

                              <button
                                type="submit"
                                disabled={isPodcastSubmitting}
                                className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-60"
                              >
                                {isPodcastSubmitting
                                  ? "Publishing..."
                                  : "Publish Podcast"}
                              </button>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-3xl border border-dashed border-white/10 p-6 text-center text-white/50">
                          <p className="text-sm font-semibold">
                            Select a channel to view its current status.
                          </p>
                          <p className="text-xs mt-3">
                            Once selected, you can publish a podcast directly
                            inside this channel.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold font-secondary">
                    Listening History
                  </h2>
                  <p className="text-sm text-white/40">
                    Podcasts you have listened to recently.
                  </p>
                </div>

                {/* Beautiful Mock History display */}
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      id: "1",
                      title: "GPT-5 Architecture & Release Speculations",
                      channel: "AI Frontier",
                      duration: "45m",
                      date: "2 hours ago",
                    },
                    {
                      id: "2",
                      title: "Neuralink Human Trials: The First 100 Days",
                      channel: "BioTech Daily",
                      duration: "1h 12m",
                      date: "Yesterday",
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="liquid-glass border border-white/5 hover:border-white/10 transition-all duration-200 rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold">
                          {item.channel.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-white/40 mt-0.5">
                            {item.channel} • {item.duration}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-white/30">{item.date}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Watch Later Tab */}
            {activeTab === "watch-later" && (
              <motion.div
                key="watch-later"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold font-secondary">
                    Saved for Later
                  </h2>
                  <p className="text-sm text-white/40">
                    Keep track of podcasts you want to watch or listen to later.
                  </p>
                </div>

                {/* Beautiful Mock Watch Later display */}
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      id: "1",
                      title: "Quantum Computing meets Artificial Intelligence",
                      channel: "Quantum Future",
                      duration: "32m",
                      date: "Added 3 days ago",
                    },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="liquid-glass border border-white/5 hover:border-white/10 transition-all duration-200 rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-purple-950 flex items-center justify-center text-purple-400 font-bold">
                          {item.channel.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs text-white/40 mt-0.5">
                            {item.channel} • {item.duration}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-white/30">{item.date}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Create Channel Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-[#0e1320] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-secondary flex items-center gap-2">
                  <Tv className="w-5 h-5 text-cyan-400" />
                  Create Channel
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-white/40 hover:text-white transition text-2xl font-light cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3 text-cyan-400">
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/30">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold font-secondary">
                    Channel Created Successfully!
                  </h4>
                  <p className="text-xs text-white/40 font-sans">
                    Refreshing your channel list...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCreateChannel} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/60 font-sans">
                      Channel Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., AI Horizon"
                      value={channelName}
                      onChange={(e) => setChannelName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 text-white font-sans"
                      maxLength={50}
                      required
                    />
                    {channelName.trim().length > 0 && (
                      <span className="text-[10px] text-cyan-400/70 font-sans flex items-center gap-1 mt-1">
                        <Globe className="w-3 h-3" />
                        URL: convoai.com/channels/{slugPreview}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/60 font-sans">
                      Description
                    </label>
                    <textarea
                      placeholder="What is your channel about?"
                      value={channelDescription}
                      onChange={(e) => setChannelDescription(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 text-white font-sans min-h-[100px] resize-none"
                      maxLength={300}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-white/60 font-sans">
                      Visibility
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: "PUBLIC",
                          label: "Public",
                          icon: Globe,
                          desc: "Anyone can view",
                        },
                        {
                          id: "PRIVATE",
                          label: "Private",
                          icon: Lock,
                          desc: "Only you can view",
                        },
                        {
                          id: "UNLISTED",
                          label: "Unlisted",
                          icon: EyeOff,
                          desc: "Viewable via link",
                        },
                      ].map((v) => {
                        const Icon = v.icon;
                        const selected = channelVisibility === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setChannelVisibility(v.id as any)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer ${
                              selected
                                ? "border-cyan-400 bg-cyan-400/5 text-cyan-300"
                                : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                            }`}
                          >
                            <Icon className="w-4 h-4 mb-1" />
                            <span className="text-xs font-bold font-sans">
                              {v.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-xl border border-red-500/20 font-sans">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/80 hover:text-white font-semibold text-sm hover:bg-white/5 transition cursor-pointer"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

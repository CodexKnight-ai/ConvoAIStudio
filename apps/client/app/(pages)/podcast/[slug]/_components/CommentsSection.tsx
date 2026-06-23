"use client";

import { useState } from "react";
import {
  MessageSquare,
  Heart,
  CornerDownRight,
  ChevronDown,
  Send,
} from "lucide-react";
import { getPodcastComments, type Comment } from "../../../feed/_data/feedData";

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(getPodcastComments());
  const [newCommentText, setNewCommentText] = useState("");
  const [sortBy, setSortBy] = useState<"top" | "newest">("top");
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Handle comment like toggle
  const toggleLike = (commentId: number, parentId?: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply: Comment) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        } else if (!parentId && comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      }),
    );
  };

  // Add new comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "You (Host)",
      avatar: "https://i.pravatar.cc/150?img=33",
      content: newCommentText.trim(),
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText("");
  };

  // Add reply
  const handleAddReply = (parentId: number) => {
    if (!replyText.trim()) return;

    const newReply: Comment = {
      id: Date.now(),
      author: "You (Host)",
      avatar: "https://i.pravatar.cc/150?img=33",
      content: replyText.trim(),
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      }),
    );

    setReplyText("");
    setReplyTargetId(null);
  };

  // Sorting
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id; // simpler mock sorting by ID
    }
    return b.likes - a.likes;
  });

  return (
    <div className="space-y-6">
      {/* Header and Sorting */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-secondary font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <span>
            Comments (
            {comments.length +
              comments.reduce((acc, c) => acc + c.replies.length, 0)}
            )
          </span>
        </h3>

        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-white/40 font-sans">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "top" | "newest")}
            className="bg-transparent text-white font-sans font-semibold outline-none cursor-pointer border-none"
          >
            <option value="top" className="bg-zinc-950 text-white">
              Top Comments
            </option>
            <option value="newest" className="bg-zinc-950 text-white">
              Newest First
            </option>
          </select>
        </div>
      </div>

      {/* Add Comment Box */}
      <form onSubmit={handleAddComment} className="flex gap-3">
        <img
          src="https://i.pravatar.cc/150?img=33"
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover border border-white/10"
        />
        <div className="flex-1 relative">
          <textarea
            placeholder="Join the conversation..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full min-h-[80px] p-3 rounded-2xl bg-white/5 focus:ring-1 focus:ring-cyan-500/50 text-white font-sans text-sm outline-none resize-none transition-all placeholder:text-white/30"
          />
          <button
            type="submit"
            className="absolute bottom-3 right-3 p-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-6 mt-4">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            {/* Main Comment */}
            <div className="flex gap-3 group">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0"
              />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-bold text-white text-sm">
                    {comment.author}
                  </span>
                  <span className="text-white/40 font-sans text-xs">
                    {comment.timestamp}
                  </span>
                </div>

                <p className="text-white/80 font-sans text-sm leading-relaxed">
                  {comment.content}
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <button
                    onClick={() => toggleLike(comment.id)}
                    className={`flex items-center gap-1 text-xs font-sans font-bold transition-colors cursor-pointer ${
                      comment.isLiked
                        ? "text-cyan-400 font-semibold"
                        : "text-white/40 hover:text-white/80"
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${comment.isLiked ? "fill-cyan-400" : ""}`}
                    />
                    <span>{comment.likes}</span>
                  </button>

                  <button
                    onClick={() => {
                      setReplyTargetId(
                        replyTargetId === comment.id ? null : comment.id,
                      );
                      setReplyText("");
                    }}
                    className="text-xs font-sans font-bold text-white/40 hover:text-white/80 transition-colors cursor-pointer"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>

            {/* Reply Input */}
            {replyTargetId === comment.id && (
              <div className="flex gap-3 ml-12 pl-4 border-l border-white/5">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={`Reply to ${comment.author}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 focus:ring-1 focus:ring-cyan-500/50 text-white font-sans text-xs outline-none placeholder:text-white/30"
                  />
                  <button
                    onClick={() => handleAddReply(comment.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies.map((reply: Comment) => (
              <div
                key={reply.id}
                className="flex gap-3 ml-12 pl-4 border-l border-white/5"
              >
                <CornerDownRight className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" />
                <img
                  src={reply.avatar}
                  alt={reply.author}
                  className="w-8 h-8 rounded-full object-cover border border-white/10 flex-shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-bold text-white text-xs">
                      {reply.author}
                    </span>
                    <span className="text-white/40 font-sans text-[10px]">
                      {reply.timestamp}
                    </span>
                  </div>

                  <p className="text-white/80 font-sans text-xs leading-relaxed">
                    {reply.content}
                  </p>

                  <div className="flex items-center gap-3 pt-0.5">
                    <button
                      onClick={() => toggleLike(reply.id, comment.id)}
                      className={`flex items-center gap-1 text-[10px] font-sans font-bold transition-colors cursor-pointer ${
                        reply.isLiked
                          ? "text-cyan-400"
                          : "text-white/40 hover:text-white/80"
                      }`}
                    >
                      <Heart
                        className={`w-3 h-3 ${reply.isLiked ? "fill-cyan-400" : ""}`}
                      />
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

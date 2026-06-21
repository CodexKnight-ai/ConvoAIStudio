-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelSubscription" DROP CONSTRAINT "ChannelSubscription_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelSubscription" DROP CONSTRAINT "ChannelSubscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "Podcast" DROP CONSTRAINT "Podcast_channelId_fkey";

-- CreateTable
CREATE TABLE "WatchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "podcastId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PodcastVote" (
    "userId" TEXT NOT NULL,
    "podcastId" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PodcastVote_pkey" PRIMARY KEY ("userId","podcastId")
);

-- CreateTable
CREATE TABLE "SavedPodcast" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "podcastId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedPodcast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WatchHistory_userId_idx" ON "WatchHistory"("userId");

-- CreateIndex
CREATE INDEX "WatchHistory_podcastId_idx" ON "WatchHistory"("podcastId");

-- CreateIndex
CREATE INDEX "PodcastVote_podcastId_idx" ON "PodcastVote"("podcastId");

-- CreateIndex
CREATE INDEX "SavedPodcast_userId_idx" ON "SavedPodcast"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedPodcast_userId_podcastId_key" ON "SavedPodcast"("userId", "podcastId");

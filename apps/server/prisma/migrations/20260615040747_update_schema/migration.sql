/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PodcastStatus" AS ENUM ('DRAFT', 'PROCESSING', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "podcastCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "subscriberCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Podcast" ADD COLUMN     "status" "PodcastStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';

-- CreateTable
CREATE TABLE "ChannelSubscription" (
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelSubscription_pkey" PRIMARY KEY ("userId","channelId")
);

-- CreateIndex
CREATE INDEX "ChannelSubscription_channelId_idx" ON "ChannelSubscription"("channelId");

-- CreateIndex
CREATE INDEX "ChannelSubscription_userId_idx" ON "ChannelSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_slug_key" ON "Channel"("slug");

-- CreateIndex
CREATE INDEX "Channel_ownerId_idx" ON "Channel"("ownerId");

-- CreateIndex
CREATE INDEX "Channel_slug_idx" ON "Channel"("slug");

-- CreateIndex
CREATE INDEX "Podcast_channelId_idx" ON "Podcast"("channelId");

-- CreateIndex
CREATE INDEX "Podcast_createdAt_idx" ON "Podcast"("createdAt");

-- CreateIndex
CREATE INDEX "Podcast_status_idx" ON "Podcast"("status");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "ChannelSubscription" ADD CONSTRAINT "ChannelSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelSubscription" ADD CONSTRAINT "ChannelSubscription_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

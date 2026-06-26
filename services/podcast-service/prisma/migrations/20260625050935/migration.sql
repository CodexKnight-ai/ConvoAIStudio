/*
  Warnings:

  - The values [PROCESSING,PUBLISHED] on the enum `PodcastStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `audioUrl` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `downvotes` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `Podcast` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Podcast` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Podcast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PodcastStatus_new" AS ENUM ('DRAFT', 'SCHEDULED', 'LIVE', 'ENDED', 'CANCELLED', 'FAILED');
ALTER TABLE "public"."Podcast" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Podcast" ALTER COLUMN "status" TYPE "PodcastStatus_new" USING ("status"::text::"PodcastStatus_new");
ALTER TYPE "PodcastStatus" RENAME TO "PodcastStatus_old";
ALTER TYPE "PodcastStatus_new" RENAME TO "PodcastStatus";
DROP TYPE "public"."PodcastStatus_old";
ALTER TABLE "Podcast" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropIndex
DROP INDEX "Podcast_createdAt_idx";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Podcast" DROP COLUMN "audioUrl",
DROP COLUMN "downvotes",
DROP COLUMN "duration",
DROP COLUMN "thumbnail",
DROP COLUMN "upvotes",
DROP COLUMN "views",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "peakViewers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scheduledAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "totalViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Podcast_scheduledAt_idx" ON "Podcast"("scheduledAt");

-- CreateIndex
CREATE INDEX "Podcast_visibility_idx" ON "Podcast"("visibility");

-- CreateIndex
CREATE INDEX "Podcast_visibility_scheduledAt_idx" ON "Podcast"("visibility", "scheduledAt");

-- AddForeignKey
ALTER TABLE "ChannelSubscription" ADD CONSTRAINT "ChannelSubscription_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

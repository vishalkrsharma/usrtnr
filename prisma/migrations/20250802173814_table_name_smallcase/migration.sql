/*
  Warnings:

  - You are about to drop the `Analytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Analytics" DROP CONSTRAINT "Analytics_shortRoute_fkey";

-- DropTable
DROP TABLE "public"."Analytics";

-- DropTable
DROP TABLE "public"."Url";

-- CreateTable
CREATE TABLE "public"."url" (
    "id" TEXT NOT NULL,
    "shortRoute" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "userId" TEXT,
    "doAnalyze" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."analytics" (
    "id" SERIAL NOT NULL,
    "shortRoute" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "referer" TEXT,
    "host" TEXT,
    "protocol" TEXT,
    "port" INTEGER,
    "fetchMode" TEXT,
    "fetchSite" TEXT,
    "fetchDest" TEXT,
    "doNotTrack" BOOLEAN,
    "globalPrivacy" BOOLEAN,
    "acceptLanguage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_shortRoute_key" ON "public"."url"("shortRoute");

-- CreateIndex
CREATE INDEX "url_originalUrl_idx" ON "public"."url"("originalUrl");

-- CreateIndex
CREATE INDEX "url_userId_idx" ON "public"."url"("userId");

-- AddForeignKey
ALTER TABLE "public"."analytics" ADD CONSTRAINT "analytics_shortRoute_fkey" FOREIGN KEY ("shortRoute") REFERENCES "public"."url"("shortRoute") ON DELETE CASCADE ON UPDATE CASCADE;

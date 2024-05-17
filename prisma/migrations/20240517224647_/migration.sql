/*
  Warnings:

  - A unique constraint covering the columns `[linkId]` on the table `LinkDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LinkDetail_linkId_key" ON "LinkDetail"("linkId");

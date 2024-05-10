/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[innerUrl]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `innerUrl` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "LinkDetail" DROP CONSTRAINT "LinkDetail_Link_linkId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "categoryId",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "describe" TEXT,
ADD COLUMN     "innerUrl" TEXT NOT NULL,
ADD COLUMN     "taskId" INTEGER;

-- AlterTable
ALTER TABLE "LinkDetail" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "taskSlug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_task_key" ON "Task"("task");

-- CreateIndex
CREATE UNIQUE INDEX "Link_url_key" ON "Link"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Link_innerUrl_key" ON "Link"("innerUrl");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkDetail" ADD CONSTRAINT "LinkDetail_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

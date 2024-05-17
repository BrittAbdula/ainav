/*
  Warnings:

  - The primary key for the `UserFavorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserFavorite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserFavorite" DROP CONSTRAINT "UserFavorite_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("userId", "linkId");

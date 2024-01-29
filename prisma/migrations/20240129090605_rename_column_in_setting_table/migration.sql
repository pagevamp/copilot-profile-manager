/*
  Warnings:

  - You are about to drop the column `profileLinks` on the `Setting` table. All the data in the column will be lost.
  - Added the required column `data` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "profileLinks",
ADD COLUMN     "data" JSONB NOT NULL;

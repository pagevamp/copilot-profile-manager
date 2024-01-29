/*
  Warnings:

  - Added the required column `portalId` to the `ClientProfileUpdates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientProfileUpdates" ADD COLUMN     "portalId" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `permissions` on the `CustomFieldAccess` table. All the data in the column will be lost.
  - Added the required column `permission` to the `CustomFieldAccess` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEW', 'EDIT');

-- AlterTable
ALTER TABLE "CustomFieldAccess" DROP COLUMN "permissions",
ADD COLUMN     "permission" "Permission" NOT NULL;

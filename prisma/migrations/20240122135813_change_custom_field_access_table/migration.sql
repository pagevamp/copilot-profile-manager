/*
  Warnings:

  - Made the column `customFieldId` on table `CustomFieldAccess` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `CustomFieldAccess` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CustomFieldAccess" ALTER COLUMN "customFieldId" SET NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

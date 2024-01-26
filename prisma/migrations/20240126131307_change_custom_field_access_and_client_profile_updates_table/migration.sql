/*
  Warnings:

  - You are about to drop the column `newCustomFields` on the `ClientProfileUpdates` table. All the data in the column will be lost.
  - You are about to drop the column `oldCustomFields` on the `ClientProfileUpdates` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `CustomFieldAccess` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `CustomFieldAccess` table. All the data in the column will be lost.
  - Added the required column `changedFields` to the `ClientProfileUpdates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customFields` to the `ClientProfileUpdates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portalId` to the `CustomFieldAccess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientProfileUpdates" DROP COLUMN "newCustomFields",
DROP COLUMN "oldCustomFields",
ADD COLUMN     "changedFields" JSONB NOT NULL,
ADD COLUMN     "customFields" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "CustomFieldAccess" DROP COLUMN "companyId",
DROP COLUMN "permission",
ADD COLUMN     "permissions" "Permission"[],
ADD COLUMN     "portalId" UUID NOT NULL;

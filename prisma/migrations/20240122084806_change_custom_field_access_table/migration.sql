-- DropIndex
DROP INDEX "CustomFieldAccess_customFieldId_key";

-- AlterTable
ALTER TABLE "CustomFieldAccess" ADD COLUMN     "companyId" UUID;

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEW', 'EDIT');

-- CreateTable
CREATE TABLE "CustomFieldAccess" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customFieldId" UUID NOT NULL,
    "portalId" TEXT NOT NULL,
    "permissions" "Permission"[],
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CustomFieldAccess_pkey" PRIMARY KEY ("id")
);

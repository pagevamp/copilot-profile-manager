-- CreateTable
CREATE TABLE "ClientProfileUpdates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "customFields" JSONB NOT NULL,
    "changedFields" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ClientProfileUpdates_pkey" PRIMARY KEY ("id")
);

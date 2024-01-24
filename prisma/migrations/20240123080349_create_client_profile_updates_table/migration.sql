-- CreateTable
CREATE TABLE "ClientProfileUpdates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clientId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "newCustomFields" JSONB NOT NULL,
    "oldCustomFields" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ClientProfileUpdates_pkey" PRIMARY KEY ("id")
);

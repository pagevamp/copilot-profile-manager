-- CreateTable
CREATE TABLE "CustomFieldAccess" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customFieldId" UUID,
    "permissions" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CustomFieldAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomFieldAccess_customFieldId_key" ON "CustomFieldAccess"("customFieldId");

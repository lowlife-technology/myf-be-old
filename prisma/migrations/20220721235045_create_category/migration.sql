/*
  Warnings:

  - You are about to drop the `incomes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "incomes";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectedAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "description" TEXT,
    "autoInsert" BOOLEAN NOT NULL DEFAULT false,
    "balanceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

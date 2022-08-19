/*
  Warnings:

  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "expireAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "eventDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bearer" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Bearer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bearer_userId_key" ON "Bearer"("userId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bearer" ADD CONSTRAINT "Bearer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `email` on the `Token` table. All the data in the column will be lost.
  - Added the required column `expireAt` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Token_email_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "email",
ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'inactive';

/*
  Warnings:

  - You are about to drop the column `name` on the `Identity` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Identity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identity" DROP COLUMN "name",
ADD COLUMN     "fullName" TEXT NOT NULL;

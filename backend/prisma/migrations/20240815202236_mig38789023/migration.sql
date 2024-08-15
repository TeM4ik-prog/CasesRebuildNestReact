/*
  Warnings:

  - Made the column `categoryRareId` on table `Loot` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Loot" DROP CONSTRAINT "Loot_categoryRareId_fkey";

-- AlterTable
ALTER TABLE "Loot" ALTER COLUMN "categoryRareId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_categoryRareId_fkey" FOREIGN KEY ("categoryRareId") REFERENCES "CategoryRare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

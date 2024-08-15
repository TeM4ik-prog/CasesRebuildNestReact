/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CategoryRare` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Loot" ADD COLUMN     "categoryRareId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "CategoryRare_name_key" ON "CategoryRare"("name");

-- AddForeignKey
ALTER TABLE "Loot" ADD CONSTRAINT "Loot_categoryRareId_fkey" FOREIGN KEY ("categoryRareId") REFERENCES "CategoryRare"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[img]` on the table `Loot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryRareId` to the `InventoryLoot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryLoot" ADD COLUMN     "categoryRareId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Loot_img_key" ON "Loot"("img");

-- AddForeignKey
ALTER TABLE "InventoryLoot" ADD CONSTRAINT "InventoryLoot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryLoot" ADD CONSTRAINT "InventoryLoot_categoryRareId_fkey" FOREIGN KEY ("categoryRareId") REFERENCES "CategoryRare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

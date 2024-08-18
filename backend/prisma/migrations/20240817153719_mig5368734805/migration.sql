/*
  Warnings:

  - You are about to alter the column `speed_boost` on the `BombDefuserGameData` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `time_boost` on the `BombDefuserGameData` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `money_boost` on the `BombDefuserGameData` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.
  - You are about to alter the column `focus_boost` on the `BombDefuserGameData` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "BombDefuserGameData" ALTER COLUMN "speed_boost" SET DEFAULT 1,
ALTER COLUMN "speed_boost" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "time_boost" SET DEFAULT 1,
ALTER COLUMN "time_boost" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "money_boost" SET DEFAULT 1,
ALTER COLUMN "money_boost" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "focus_boost" SET DEFAULT 1,
ALTER COLUMN "focus_boost" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "money" SET DEFAULT 50,
ALTER COLUMN "money" SET DATA TYPE DECIMAL(15,2);

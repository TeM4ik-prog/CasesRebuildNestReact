-- DropForeignKey
ALTER TABLE "BombDefuserGameData" DROP CONSTRAINT "BombDefuserGameData_userId_fkey";

-- AddForeignKey
ALTER TABLE "BombDefuserGameData" ADD CONSTRAINT "BombDefuserGameData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

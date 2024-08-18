-- CreateTable
CREATE TABLE "BombDefuserGameData" (
    "id" SERIAL NOT NULL,
    "speed_boost" INTEGER NOT NULL DEFAULT 1,
    "time_boost" INTEGER NOT NULL DEFAULT 1,
    "money_boost" INTEGER NOT NULL DEFAULT 1,
    "focus_boost" INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BombDefuserGameData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BombDefuserGameData_userId_key" ON "BombDefuserGameData"("userId");

-- AddForeignKey
ALTER TABLE "BombDefuserGameData" ADD CONSTRAINT "BombDefuserGameData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

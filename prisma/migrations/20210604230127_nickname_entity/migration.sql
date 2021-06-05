/*
  Warnings:

  - You are about to drop the `Nickname` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Nickname";

-- CreateTable
CREATE TABLE "NicknameEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

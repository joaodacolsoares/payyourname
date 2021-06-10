/*
  Warnings:

  - You are about to drop the column `amount` on the `NicknameEntity` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `NicknameEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NicknameEntity" DROP COLUMN "amount",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "DonationEntity" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonationEntity" ADD FOREIGN KEY ("nickname") REFERENCES "NicknameEntity"("name") ON DELETE CASCADE ON UPDATE CASCADE;

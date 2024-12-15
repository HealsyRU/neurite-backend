/*
  Warnings:

  - You are about to drop the `_BodyLikedFoodUnits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BodyLikedFoodUnits" DROP CONSTRAINT "_BodyLikedFoodUnits_A_fkey";

-- DropForeignKey
ALTER TABLE "_BodyLikedFoodUnits" DROP CONSTRAINT "_BodyLikedFoodUnits_B_fkey";

-- DropTable
DROP TABLE "_BodyLikedFoodUnits";

-- CreateTable
CREATE TABLE "BodyFavoriteFoodUnits" (
    "id" TEXT NOT NULL,
    "bodyId" TEXT NOT NULL,
    "foodUnitId" TEXT NOT NULL,

    CONSTRAINT "BodyFavoriteFoodUnits_pkey" PRIMARY KEY ("bodyId","foodUnitId","id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BodyFavoriteFoodUnits_id_key" ON "BodyFavoriteFoodUnits"("id");

-- AddForeignKey
ALTER TABLE "BodyFavoriteFoodUnits" ADD CONSTRAINT "BodyFavoriteFoodUnits_bodyId_fkey" FOREIGN KEY ("bodyId") REFERENCES "body"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyFavoriteFoodUnits" ADD CONSTRAINT "BodyFavoriteFoodUnits_foodUnitId_fkey" FOREIGN KEY ("foodUnitId") REFERENCES "food_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

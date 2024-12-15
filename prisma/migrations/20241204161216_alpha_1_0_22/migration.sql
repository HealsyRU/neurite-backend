/*
  Warnings:

  - You are about to drop the `favorite_food_units` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorite_food_units" DROP CONSTRAINT "favorite_food_units_bodyId_fkey";

-- DropForeignKey
ALTER TABLE "favorite_food_units" DROP CONSTRAINT "favorite_food_units_foodUnitId_fkey";

-- DropTable
DROP TABLE "favorite_food_units";

-- CreateTable
CREATE TABLE "_BodyLikedFoodUnits" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BodyLikedFoodUnits_AB_unique" ON "_BodyLikedFoodUnits"("A", "B");

-- CreateIndex
CREATE INDEX "_BodyLikedFoodUnits_B_index" ON "_BodyLikedFoodUnits"("B");

-- AddForeignKey
ALTER TABLE "_BodyLikedFoodUnits" ADD CONSTRAINT "_BodyLikedFoodUnits_A_fkey" FOREIGN KEY ("A") REFERENCES "body"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BodyLikedFoodUnits" ADD CONSTRAINT "_BodyLikedFoodUnits_B_fkey" FOREIGN KEY ("B") REFERENCES "food_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

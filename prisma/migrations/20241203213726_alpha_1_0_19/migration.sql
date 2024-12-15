/*
  Warnings:

  - You are about to drop the `_BodyToFoodUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BodyToFoodUnit" DROP CONSTRAINT "_BodyToFoodUnit_A_fkey";

-- DropForeignKey
ALTER TABLE "_BodyToFoodUnit" DROP CONSTRAINT "_BodyToFoodUnit_B_fkey";

-- DropTable
DROP TABLE "_BodyToFoodUnit";

-- CreateTable
CREATE TABLE "favorite_food_units" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bodyId" TEXT NOT NULL,
    "foodUnitId" TEXT NOT NULL,

    CONSTRAINT "favorite_food_units_pkey" PRIMARY KEY ("bodyId","foodUnitId")
);

-- AddForeignKey
ALTER TABLE "favorite_food_units" ADD CONSTRAINT "favorite_food_units_bodyId_fkey" FOREIGN KEY ("bodyId") REFERENCES "body"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_food_units" ADD CONSTRAINT "favorite_food_units_foodUnitId_fkey" FOREIGN KEY ("foodUnitId") REFERENCES "food_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

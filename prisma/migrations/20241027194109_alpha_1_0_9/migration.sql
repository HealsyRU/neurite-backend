/*
  Warnings:

  - You are about to drop the `_FoodPortionToMeal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FoodPortionToMeal" DROP CONSTRAINT "_FoodPortionToMeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodPortionToMeal" DROP CONSTRAINT "_FoodPortionToMeal_B_fkey";

-- DropTable
DROP TABLE "_FoodPortionToMeal";

-- CreateTable
CREATE TABLE "MealFoodUnits" (
    "mealId" TEXT NOT NULL,
    "foodUnitId" TEXT NOT NULL,
    "portionId" TEXT NOT NULL,

    CONSTRAINT "MealFoodUnits_pkey" PRIMARY KEY ("mealId","foodUnitId")
);

-- AddForeignKey
ALTER TABLE "MealFoodUnits" ADD CONSTRAINT "MealFoodUnits_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealFoodUnits" ADD CONSTRAINT "MealFoodUnits_foodUnitId_fkey" FOREIGN KEY ("foodUnitId") REFERENCES "food_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

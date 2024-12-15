/*
  Warnings:

  - The primary key for the `MealFoodUnits` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "MealFoodUnits" DROP CONSTRAINT "MealFoodUnits_portion_id_fkey";

-- AlterTable
ALTER TABLE "MealFoodUnits" DROP CONSTRAINT "MealFoodUnits_pkey",
ALTER COLUMN "portion_id" DROP NOT NULL,
ADD CONSTRAINT "MealFoodUnits_pkey" PRIMARY KEY ("mealId", "foodUnitId", "id");

-- AddForeignKey
ALTER TABLE "MealFoodUnits" ADD CONSTRAINT "MealFoodUnits_portion_id_fkey" FOREIGN KEY ("portion_id") REFERENCES "food_portion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

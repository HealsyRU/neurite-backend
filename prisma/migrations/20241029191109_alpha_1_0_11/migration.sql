/*
  Warnings:

  - The primary key for the `MealFoodUnits` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MealFoodUnits" DROP CONSTRAINT "MealFoodUnits_pkey",
ADD CONSTRAINT "MealFoodUnits_pkey" PRIMARY KEY ("mealId", "foodUnitId", "meal_day_id");

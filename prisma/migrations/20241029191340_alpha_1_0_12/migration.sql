/*
  Warnings:

  - The primary key for the `MealFoodUnits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `meal_day_id` on the `MealFoodUnits` table. All the data in the column will be lost.
  - Added the required column `portion_id` to the `MealFoodUnits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MealFoodUnits" DROP CONSTRAINT "MealFoodUnits_meal_day_id_fkey";

-- AlterTable
ALTER TABLE "MealFoodUnits" DROP CONSTRAINT "MealFoodUnits_pkey",
DROP COLUMN "meal_day_id",
ADD COLUMN     "portion_id" TEXT NOT NULL,
ADD CONSTRAINT "MealFoodUnits_pkey" PRIMARY KEY ("mealId", "foodUnitId", "portion_id");

-- AddForeignKey
ALTER TABLE "MealFoodUnits" ADD CONSTRAINT "MealFoodUnits_portion_id_fkey" FOREIGN KEY ("portion_id") REFERENCES "food_portion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

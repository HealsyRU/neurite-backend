/*
  Warnings:

  - You are about to drop the column `portionId` on the `MealFoodUnits` table. All the data in the column will be lost.
  - Added the required column `meal_day_id` to the `MealFoodUnits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealFoodUnits" DROP COLUMN "portionId",
ADD COLUMN     "meal_day_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MealFoodUnits" ADD CONSTRAINT "MealFoodUnits_meal_day_id_fkey" FOREIGN KEY ("meal_day_id") REFERENCES "food_portion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

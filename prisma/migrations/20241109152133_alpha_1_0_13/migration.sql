/*
  Warnings:

  - The primary key for the `MealFoodUnits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `MealFoodUnits` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `MealFoodUnits` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "MealFoodUnits" DROP CONSTRAINT "MealFoodUnits_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "multiplier" INTEGER NOT NULL DEFAULT 100,
ADD CONSTRAINT "MealFoodUnits_pkey" PRIMARY KEY ("mealId", "foodUnitId", "portion_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "MealFoodUnits_id_key" ON "MealFoodUnits"("id");

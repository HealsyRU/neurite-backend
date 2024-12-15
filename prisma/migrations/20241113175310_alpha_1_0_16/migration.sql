/*
  Warnings:

  - Made the column `multiplier` on table `MealFoodUnits` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MealFoodUnits" ALTER COLUMN "multiplier" SET NOT NULL,
ALTER COLUMN "multiplier" SET DEFAULT 1;

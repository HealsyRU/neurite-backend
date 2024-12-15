/*
  Warnings:

  - You are about to drop the column `meal_id` on the `food_portion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "food_portion" DROP CONSTRAINT "food_portion_meal_id_fkey";

-- DropIndex
DROP INDEX "food_portion_meal_id_key";

-- AlterTable
ALTER TABLE "food_portion" DROP COLUMN "meal_id";

-- CreateTable
CREATE TABLE "_FoodPortionToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodPortionToMeal_AB_unique" ON "_FoodPortionToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodPortionToMeal_B_index" ON "_FoodPortionToMeal"("B");

-- AddForeignKey
ALTER TABLE "_FoodPortionToMeal" ADD CONSTRAINT "_FoodPortionToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "food_portion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodPortionToMeal" ADD CONSTRAINT "_FoodPortionToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

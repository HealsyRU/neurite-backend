/*
  Warnings:

  - A unique constraint covering the columns `[meal_id]` on the table `food_portion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `meal_id` to the `food_portion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food_portion" ADD COLUMN     "meal_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "food_portion_meal_id_key" ON "food_portion"("meal_id");

-- AddForeignKey
ALTER TABLE "food_portion" ADD CONSTRAINT "food_portion_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

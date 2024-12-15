/*
  Warnings:

  - You are about to drop the column `title` on the `meal` table. All the data in the column will be lost.
  - You are about to drop the column `meal_day_id` on the `meal_day_unit` table. All the data in the column will be lost.
  - You are about to drop the column `favorite` on the `user_meal_day` table. All the data in the column will be lost.
  - You are about to drop the column `meal_day_id` on the `user_meal_day` table. All the data in the column will be lost.
  - You are about to drop the `user_food_unit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_meal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `meal_day_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_meal_day_id` to the `meal_day_unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meal_day_unit" DROP CONSTRAINT "meal_day_unit_meal_day_id_fkey";

-- DropForeignKey
ALTER TABLE "user_food_unit" DROP CONSTRAINT "user_food_unit_food_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "user_food_unit" DROP CONSTRAINT "user_food_unit_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_meal" DROP CONSTRAINT "user_meal_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "user_meal" DROP CONSTRAINT "user_meal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_meal_day" DROP CONSTRAINT "user_meal_day_meal_day_id_fkey";

-- DropIndex
DROP INDEX "user_meal_day_date_key";

-- AlterTable
ALTER TABLE "meal" DROP COLUMN "title",
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "meal_day" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "meal_day_unit" DROP COLUMN "meal_day_id",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "user_meal_day_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_meal_day" DROP COLUMN "favorite",
DROP COLUMN "meal_day_id";

-- DropTable
DROP TABLE "user_food_unit";

-- DropTable
DROP TABLE "user_meal";

-- CreateTable
CREATE TABLE "meal_category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "meal_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatrixMealDayToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MatrixMealDayToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MealToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FoodUnitToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "meal_category_title_key" ON "meal_category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_MatrixMealDayToMeal_AB_unique" ON "_MatrixMealDayToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_MatrixMealDayToMeal_B_index" ON "_MatrixMealDayToMeal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MatrixMealDayToUser_AB_unique" ON "_MatrixMealDayToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MatrixMealDayToUser_B_index" ON "_MatrixMealDayToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealToUser_AB_unique" ON "_MealToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MealToUser_B_index" ON "_MealToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodUnitToUser_AB_unique" ON "_FoodUnitToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodUnitToUser_B_index" ON "_FoodUnitToUser"("B");

-- AddForeignKey
ALTER TABLE "meal_day_unit" ADD CONSTRAINT "meal_day_unit_user_meal_day_id_fkey" FOREIGN KEY ("user_meal_day_id") REFERENCES "user_meal_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatrixMealDayToMeal" ADD CONSTRAINT "_MatrixMealDayToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "meal_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatrixMealDayToMeal" ADD CONSTRAINT "_MatrixMealDayToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatrixMealDayToUser" ADD CONSTRAINT "_MatrixMealDayToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "meal_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatrixMealDayToUser" ADD CONSTRAINT "_MatrixMealDayToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToUser" ADD CONSTRAINT "_MealToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToUser" ADD CONSTRAINT "_MealToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodUnitToUser" ADD CONSTRAINT "_FoodUnitToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "food_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodUnitToUser" ADD CONSTRAINT "_FoodUnitToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

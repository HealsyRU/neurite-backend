/*
  Warnings:

  - You are about to drop the column `mealDayId` on the `user_meal_day` table. All the data in the column will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `meal_day_id` to the `user_meal_day` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_account_id_fkey";

-- DropForeignKey
ALTER TABLE "user_meal_day" DROP CONSTRAINT "user_meal_day_mealDayId_fkey";

-- AlterTable
ALTER TABLE "user_meal_day" DROP COLUMN "mealDayId",
ADD COLUMN     "meal_day_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "token";

-- CreateTable
CREATE TABLE "UserMealSchema" (
    "id" TEXT NOT NULL,

    CONSTRAINT "UserMealSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_meal_schema_item" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "user_meal_schema_id" TEXT NOT NULL,

    CONSTRAINT "user_meal_schema_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_day_unit" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "meal_day_id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,

    CONSTRAINT "meal_day_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_meal" (
    "id" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "meal_id" TEXT NOT NULL,

    CONSTRAINT "user_meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_unit" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "meal_id" TEXT NOT NULL,
    "food_unit_id" TEXT NOT NULL,

    CONSTRAINT "meal_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_food_unit" (
    "id" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "food_unit_id" TEXT NOT NULL,

    CONSTRAINT "user_food_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_unit" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "energy" INTEGER NOT NULL,
    "barcode" INTEGER NOT NULL,

    CONSTRAINT "food_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "food_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_unit_nutrient" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 100,
    "food_unit_id" TEXT NOT NULL,
    "nutrient_id" TEXT NOT NULL,

    CONSTRAINT "food_unit_nutrient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrient" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "measure" TEXT NOT NULL,
    "system" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "nutrient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FoodCategoryToFoodUnit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodCategoryToFoodUnit_AB_unique" ON "_FoodCategoryToFoodUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodCategoryToFoodUnit_B_index" ON "_FoodCategoryToFoodUnit"("B");

-- AddForeignKey
ALTER TABLE "user_meal_schema_item" ADD CONSTRAINT "user_meal_schema_item_user_meal_schema_id_fkey" FOREIGN KEY ("user_meal_schema_id") REFERENCES "UserMealSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_meal_day" ADD CONSTRAINT "user_meal_day_meal_day_id_fkey" FOREIGN KEY ("meal_day_id") REFERENCES "meal_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_day_unit" ADD CONSTRAINT "meal_day_unit_meal_day_id_fkey" FOREIGN KEY ("meal_day_id") REFERENCES "meal_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_day_unit" ADD CONSTRAINT "meal_day_unit_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_meal" ADD CONSTRAINT "user_meal_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_unit" ADD CONSTRAINT "meal_unit_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_unit" ADD CONSTRAINT "meal_unit_food_unit_id_fkey" FOREIGN KEY ("food_unit_id") REFERENCES "food_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_food_unit" ADD CONSTRAINT "user_food_unit_food_unit_id_fkey" FOREIGN KEY ("food_unit_id") REFERENCES "food_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_unit_nutrient" ADD CONSTRAINT "food_unit_nutrient_food_unit_id_fkey" FOREIGN KEY ("food_unit_id") REFERENCES "food_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_unit_nutrient" ADD CONSTRAINT "food_unit_nutrient_nutrient_id_fkey" FOREIGN KEY ("nutrient_id") REFERENCES "nutrient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodCategoryToFoodUnit" ADD CONSTRAINT "_FoodCategoryToFoodUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "food_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodCategoryToFoodUnit" ADD CONSTRAINT "_FoodCategoryToFoodUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "food_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

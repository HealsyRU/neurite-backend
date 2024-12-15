/*
  Warnings:

  - You are about to drop the column `activated` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `allowedUsers` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `premium` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `energy` on the `food_unit` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `food_unit` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `meal_day` table. All the data in the column will be lost.
  - You are about to drop the column `is_public` on the `meal_day` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `meal_unit` table. All the data in the column will be lost.
  - You are about to drop the column `food_unit_id` on the `meal_unit` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `meal_unit` table. All the data in the column will be lost.
  - You are about to drop the `UserMealSchema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FoodUnitToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatrixMealDayToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MealToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `food_unit_nutrient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meal_day_unit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nutrient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_meal_day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_meal_schema_item` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[food_unit_id]` on the table `food_unit` will be added. If there are existing duplicate values, this will fail.
  - The required column `username` was added to the `account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `activationLink` on table `account` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `food_unit_id` to the `food_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `food_unit` table without a default value. This is not possible if the table is not empty.
  - Made the column `barcode` on table `food_unit` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body_id` to the `meal_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `meal_day` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `meal_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_day_id` to the `meal_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `meal_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `meal_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `meal_unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserMealSchema" DROP CONSTRAINT "UserMealSchema_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToRole" DROP CONSTRAINT "_AccountToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToRole" DROP CONSTRAINT "_AccountToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "_FoodUnitToUser" DROP CONSTRAINT "_FoodUnitToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodUnitToUser" DROP CONSTRAINT "_FoodUnitToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_MatrixMealDayToMeal" DROP CONSTRAINT "_MatrixMealDayToMeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatrixMealDayToUser" DROP CONSTRAINT "_MatrixMealDayToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatrixMealDayToUser" DROP CONSTRAINT "_MatrixMealDayToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_MealToUser" DROP CONSTRAINT "_MealToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MealToUser" DROP CONSTRAINT "_MealToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "food_unit_nutrient" DROP CONSTRAINT "food_unit_nutrient_food_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "food_unit_nutrient" DROP CONSTRAINT "food_unit_nutrient_nutrient_id_fkey";

-- DropForeignKey
ALTER TABLE "meal_day_unit" DROP CONSTRAINT "meal_day_unit_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "meal_day_unit" DROP CONSTRAINT "meal_day_unit_user_meal_day_id_fkey";

-- DropForeignKey
ALTER TABLE "meal_unit" DROP CONSTRAINT "meal_unit_food_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_account_id_fkey";

-- DropForeignKey
ALTER TABLE "user_meal_day" DROP CONSTRAINT "user_meal_day_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_meal_schema_item" DROP CONSTRAINT "user_meal_schema_item_user_meal_schema_id_fkey";

-- DropIndex
DROP INDEX "account_activationLink_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "activated",
DROP COLUMN "allowedUsers",
DROP COLUMN "premium",
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMainFilled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "activationLink" SET NOT NULL;

-- AlterTable
ALTER TABLE "food_unit" DROP COLUMN "energy",
DROP COLUMN "title",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "food_unit_id" TEXT NOT NULL,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "barcode" SET NOT NULL,
ALTER COLUMN "barcode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "meal" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "meal_day" DROP COLUMN "authorId",
DROP COLUMN "is_public",
ADD COLUMN     "body_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "meal_unit" DROP COLUMN "cost",
DROP COLUMN "food_unit_id",
DROP COLUMN "weight",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "meal_day_id" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "UserMealSchema";

-- DropTable
DROP TABLE "_AccountToRole";

-- DropTable
DROP TABLE "_FoodUnitToUser";

-- DropTable
DROP TABLE "_MatrixMealDayToUser";

-- DropTable
DROP TABLE "_MealToUser";

-- DropTable
DROP TABLE "food_unit_nutrient";

-- DropTable
DROP TABLE "meal_day_unit";

-- DropTable
DROP TABLE "nutrient";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_meal_day";

-- DropTable
DROP TABLE "user_meal_schema_item";

-- CreateTable
CREATE TABLE "limitation_schema" (
    "id" TEXT NOT NULL,
    "bodyLimit" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "limitation_schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bodyName" TEXT NOT NULL,
    "sex" INTEGER NOT NULL DEFAULT 0,
    "birthDate" TEXT NOT NULL,
    "pal" TEXT NOT NULL DEFAULT '1.2',
    "ccalNorm" INTEGER NOT NULL DEFAULT 2500,
    "mainGoal" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "body_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameter" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "master_id" TEXT NOT NULL,
    "body_id" TEXT NOT NULL,

    CONSTRAINT "parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_parameter" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "master_parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "current_goal" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL,
    "parameter_id" TEXT NOT NULL,

    CONSTRAINT "current_goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" INTEGER NOT NULL,
    "parameter_id" TEXT NOT NULL,

    CONSTRAINT "goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealSchemaItem" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "energy" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "carb" INTEGER NOT NULL,
    "body_id" TEXT NOT NULL,

    CONSTRAINT "MealSchemaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_portion" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "food_portion_category_id" TEXT NOT NULL,
    "food_unit_id" TEXT NOT NULL,

    CONSTRAINT "food_portion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_portion_category" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "is_system" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "food_portion_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrient_schema" (
    "id" TEXT NOT NULL,
    "glycemicIndex" INTEGER NOT NULL,
    "glycemicLoad" INTEGER NOT NULL,
    "insulinIndex" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "carb" INTEGER NOT NULL,
    "alcohol" INTEGER NOT NULL,
    "water" INTEGER NOT NULL,
    "fiber" INTEGER NOT NULL,
    "sugar" INTEGER NOT NULL,
    "sucrose" INTEGER NOT NULL,
    "glucose" INTEGER NOT NULL,
    "fructose" INTEGER NOT NULL,
    "lactose" INTEGER NOT NULL,
    "maltose" INTEGER NOT NULL,
    "galactose" INTEGER NOT NULL,
    "strach" INTEGER NOT NULL,
    "trans" INTEGER NOT NULL,
    "saturated" INTEGER NOT NULL,
    "mono" INTEGER NOT NULL,
    "poly" INTEGER NOT NULL,
    "omega3" INTEGER NOT NULL,
    "omega6" INTEGER NOT NULL,
    "bCar" INTEGER NOT NULL,
    "vitA" INTEGER NOT NULL,
    "vitC" INTEGER NOT NULL,
    "vitK" INTEGER NOT NULL,
    "vitE" INTEGER NOT NULL,
    "vitD" INTEGER NOT NULL,
    "vitB1" INTEGER NOT NULL,
    "vitB2" INTEGER NOT NULL,
    "vitB3" INTEGER NOT NULL,
    "vitB4" INTEGER NOT NULL,
    "vitB5" INTEGER NOT NULL,
    "vitB6" INTEGER NOT NULL,
    "vitB7" INTEGER NOT NULL,
    "vitB9" INTEGER NOT NULL,
    "vitB11" INTEGER NOT NULL,
    "vitB12" INTEGER NOT NULL,
    "q10" INTEGER NOT NULL,
    "vitN" INTEGER NOT NULL,
    "vitH" INTEGER NOT NULL,
    "creatine" INTEGER NOT NULL,
    "cholesterol" INTEGER NOT NULL,
    "teobromine" INTEGER NOT NULL,
    "lycopene" INTEGER NOT NULL,
    "caffeine" INTEGER NOT NULL,
    "ca" INTEGER NOT NULL,
    "ph" INTEGER NOT NULL,
    "mg" INTEGER NOT NULL,
    "fe" INTEGER NOT NULL,
    "zn" INTEGER NOT NULL,
    "i" INTEGER NOT NULL,
    "cu" INTEGER NOT NULL,
    "mn" INTEGER NOT NULL,
    "se" INTEGER NOT NULL,
    "si" INTEGER NOT NULL,
    "f" INTEGER NOT NULL,
    "k" INTEGER NOT NULL,
    "na" INTEGER NOT NULL,
    "cl" INTEGER NOT NULL,
    "cr" INTEGER NOT NULL,
    "co" INTEGER NOT NULL,
    "mo" INTEGER NOT NULL,
    "s" INTEGER NOT NULL,
    "tryptophan" INTEGER NOT NULL,
    "threonine" INTEGER NOT NULL,
    "isoleucine" INTEGER NOT NULL,
    "leucine" INTEGER NOT NULL,
    "lysine" INTEGER NOT NULL,
    "methionine" INTEGER NOT NULL,
    "phenylalanine" INTEGER NOT NULL,
    "valine" INTEGER NOT NULL,
    "histidine" INTEGER NOT NULL,
    "cysteine" INTEGER NOT NULL,
    "tyrosine" INTEGER NOT NULL,
    "arginine" INTEGER NOT NULL,
    "serine" INTEGER NOT NULL,
    "asparagine" INTEGER NOT NULL,
    "glutamine" INTEGER NOT NULL,
    "alanine" INTEGER NOT NULL,
    "glycine" INTEGER NOT NULL,
    "proline" INTEGER NOT NULL,

    CONSTRAINT "nutrient_schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matrix_meal_day" (
    "id" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "matrix_meal_day_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MealToMealCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "current_goal_parameter_id_key" ON "current_goal"("parameter_id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealToMealCategory_AB_unique" ON "_MealToMealCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_MealToMealCategory_B_index" ON "_MealToMealCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "food_unit_food_unit_id_key" ON "food_unit"("food_unit_id");

-- AddForeignKey
ALTER TABLE "body" ADD CONSTRAINT "body_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parameter" ADD CONSTRAINT "parameter_master_id_fkey" FOREIGN KEY ("master_id") REFERENCES "master_parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parameter" ADD CONSTRAINT "parameter_body_id_fkey" FOREIGN KEY ("body_id") REFERENCES "body"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "current_goal" ADD CONSTRAINT "current_goal_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal" ADD CONSTRAINT "goal_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealSchemaItem" ADD CONSTRAINT "MealSchemaItem_body_id_fkey" FOREIGN KEY ("body_id") REFERENCES "body"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_day" ADD CONSTRAINT "meal_day_body_id_fkey" FOREIGN KEY ("body_id") REFERENCES "body"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_unit" ADD CONSTRAINT "meal_unit_meal_day_id_fkey" FOREIGN KEY ("meal_day_id") REFERENCES "meal_day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_portion" ADD CONSTRAINT "food_portion_food_portion_category_id_fkey" FOREIGN KEY ("food_portion_category_id") REFERENCES "food_portion_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_portion" ADD CONSTRAINT "food_portion_food_unit_id_fkey" FOREIGN KEY ("food_unit_id") REFERENCES "food_unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_unit" ADD CONSTRAINT "food_unit_food_unit_id_fkey" FOREIGN KEY ("food_unit_id") REFERENCES "nutrient_schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToMealCategory" ADD CONSTRAINT "_MealToMealCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToMealCategory" ADD CONSTRAINT "_MealToMealCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "meal_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatrixMealDayToMeal" ADD CONSTRAINT "_MatrixMealDayToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "matrix_meal_day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `favorite_food_units` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `favorite_food_units` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "favorite_food_units" DROP CONSTRAINT "favorite_food_units_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "favorite_food_units_pkey" PRIMARY KEY ("bodyId", "foodUnitId", "id");

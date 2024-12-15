/*
  Warnings:

  - Added the required column `measure` to the `food_portion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food_portion" ADD COLUMN     "measure" TEXT NOT NULL;

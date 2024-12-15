/*
  Warnings:

  - Added the required column `title` to the `food_unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "food_unit" ADD COLUMN     "title" TEXT NOT NULL;

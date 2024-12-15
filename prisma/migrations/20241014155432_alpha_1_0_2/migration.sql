/*
  Warnings:

  - You are about to drop the column `date` on the `meal_unit` table. All the data in the column will be lost.
  - Added the required column `date` to the `meal_day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meal_day" ADD COLUMN     "date" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "meal_unit" DROP COLUMN "date";

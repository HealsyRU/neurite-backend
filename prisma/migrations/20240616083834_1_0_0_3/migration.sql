/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `food_category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "food_category_title_key" ON "food_category"("title");

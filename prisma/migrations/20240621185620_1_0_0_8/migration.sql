/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `user_meal_day` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `user_meal_schema_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_meal_day_date_key" ON "user_meal_day"("date");

-- CreateIndex
CREATE UNIQUE INDEX "user_meal_schema_item_title_key" ON "user_meal_schema_item"("title");

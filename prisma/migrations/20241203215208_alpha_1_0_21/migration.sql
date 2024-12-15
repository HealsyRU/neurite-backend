/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `favorite_food_units` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_food_units_id_key" ON "favorite_food_units"("id");

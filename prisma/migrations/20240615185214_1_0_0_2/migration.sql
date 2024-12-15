/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `nutrient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `nutrient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_food_unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nutrient" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_food_unit" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_meal" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "nutrient_title_key" ON "nutrient"("title");

-- AddForeignKey
ALTER TABLE "user_meal" ADD CONSTRAINT "user_meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_food_unit" ADD CONSTRAINT "user_food_unit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

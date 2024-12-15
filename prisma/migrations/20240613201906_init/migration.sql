/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `UserMealSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `UserMealSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMealSchema" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserMealSchema_user_id_key" ON "UserMealSchema"("user_id");

-- AddForeignKey
ALTER TABLE "UserMealSchema" ADD CONSTRAINT "UserMealSchema_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

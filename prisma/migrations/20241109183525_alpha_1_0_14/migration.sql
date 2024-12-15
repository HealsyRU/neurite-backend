-- AlterTable
ALTER TABLE "MealFoodUnits" ADD COLUMN     "cost" INTEGER,
ALTER COLUMN "multiplier" DROP NOT NULL,
ALTER COLUMN "multiplier" DROP DEFAULT;

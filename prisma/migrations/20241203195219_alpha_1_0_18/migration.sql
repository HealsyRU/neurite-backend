-- CreateTable
CREATE TABLE "_BodyToFoodUnit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BodyToFoodUnit_AB_unique" ON "_BodyToFoodUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_BodyToFoodUnit_B_index" ON "_BodyToFoodUnit"("B");

-- AddForeignKey
ALTER TABLE "_BodyToFoodUnit" ADD CONSTRAINT "_BodyToFoodUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "body"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BodyToFoodUnit" ADD CONSTRAINT "_BodyToFoodUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "food_unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

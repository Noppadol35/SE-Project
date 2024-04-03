/*
  Warnings:

  - The primary key for the `Bill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guest_id` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `table_id` on the `Bill` table. All the data in the column will be lost.
  - The `id` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `category` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Table` table. All the data in the column will be lost.
  - Added the required column `people` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableID` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billID` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryID` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusID` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('PAID', 'UNPAID');

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_guest_id_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_table_id_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_pkey",
DROP COLUMN "guest_id",
DROP COLUMN "table_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "people" INTEGER NOT NULL,
ADD COLUMN     "status" "BillStatus" NOT NULL DEFAULT 'PAID',
ADD COLUMN     "tableID" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "billID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "category",
ADD COLUMN     "categoryID" INTEGER NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "statusID" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Category";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'IDLE',

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChefPage" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "menu" TEXT NOT NULL,
    "status" TEXT DEFAULT 'served',
    "orderID" INTEGER NOT NULL,
    "tableID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChefPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_billID_fkey" FOREIGN KEY ("billID") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChefPage" ADD CONSTRAINT "ChefPage_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChefPage" ADD CONSTRAINT "ChefPage_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

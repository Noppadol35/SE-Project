/*
  Warnings:

  - The values [MANAGER,CHEF,WAITER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `position` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('manager', 'chef', 'waiter', 'cashier');
ALTER TABLE "User" ALTER COLUMN "position" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "position",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'waiter';

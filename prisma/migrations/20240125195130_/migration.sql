/*
  Warnings:

  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Made the column `provider_account_id` on table `accounts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "accounts_provider_userId_key";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "provider_account_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

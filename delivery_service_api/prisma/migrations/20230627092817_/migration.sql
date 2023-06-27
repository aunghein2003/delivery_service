/*
  Warnings:

  - Added the required column `deli_fees` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `pickup_date` on table `pickup` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `delivery_ibfk_1`;

-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `delivery_ibfk_2`;

-- DropForeignKey
ALTER TABLE `pickup` DROP FOREIGN KEY `pickup_ibfk_1`;

-- DropForeignKey
ALTER TABLE `pickup` DROP FOREIGN KEY `pickup_ibfk_2`;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `deli_fees` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pickup` MODIFY `pickup_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `online_shop_name_idx` ON `online_shop`(`name`);

-- AddForeignKey
ALTER TABLE `pickup` ADD CONSTRAINT `pickup_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pickup` ADD CONSTRAINT `pickup_ibfk_2` FOREIGN KEY (`pickup_by`) REFERENCES `biker`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `pickup`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`biker_id`) REFERENCES `biker`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

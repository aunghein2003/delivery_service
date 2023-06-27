-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `delivery_ibfk_2`;

-- DropForeignKey
ALTER TABLE `pickup` DROP FOREIGN KEY `pickup_ibfk_2`;

-- AlterTable
ALTER TABLE `delivery` MODIFY `biker_id` CHAR(5) NULL;

-- AlterTable
ALTER TABLE `pickup` MODIFY `pickup_by` CHAR(5) NULL;

-- AddForeignKey
ALTER TABLE `pickup` ADD CONSTRAINT `pickup_ibfk_2` FOREIGN KEY (`pickup_by`) REFERENCES `biker`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`biker_id`) REFERENCES `biker`(`code`) ON DELETE SET NULL ON UPDATE CASCADE;

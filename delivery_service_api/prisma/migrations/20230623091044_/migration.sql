-- CreateTable
CREATE TABLE `admin` (
    `code` CHAR(5) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `hashed_password` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biker` (
    `code` CHAR(5) NOT NULL,
    `name` VARCHAR(80) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `change_password` BOOLEAN NULL DEFAULT false,
    `hashed_password` VARCHAR(80) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery` (
    `order_id` INTEGER NOT NULL,
    `biker_id` CHAR(5) NOT NULL,
    `status` ENUM('Assigned', 'Enroute', 'Delivered') NULL DEFAULT 'Assigned',

    INDEX `biker_id`(`biker_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `online_shop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `address` VARCHAR(80) NOT NULL,
    `township` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `address` VARCHAR(80) NOT NULL,
    `township` VARCHAR(50) NOT NULL,
    `total_amount` INTEGER NOT NULL,
    `online_shop_id` INTEGER NOT NULL,

    INDEX `online_shop`(`online_shop_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pickup` (
    `order_id` INTEGER NOT NULL,
    `pickup_by` CHAR(5) NOT NULL,
    `pickup_date` DATETIME(0) NULL,
    `paid` BOOLEAN NOT NULL,

    INDEX `pickup_by`(`pickup_by`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `pickup`(`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`biker_id`) REFERENCES `biker`(`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`online_shop_id`) REFERENCES `online_shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pickup` ADD CONSTRAINT `pickup_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pickup` ADD CONSTRAINT `pickup_ibfk_2` FOREIGN KEY (`pickup_by`) REFERENCES `biker`(`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- CreateTable
CREATE TABLE `anti_link_channels` (
    `id` VARCHAR(32) NOT NULL,
    `configuration_id` BIGINT NOT NULL,

    INDEX `configuration_id`(`configuration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_user` (
    `guild_id` VARCHAR(32) NOT NULL,
    `user_id` VARCHAR(32) NOT NULL,
    `level` BIGINT NOT NULL DEFAULT 0,
    `xp` VARCHAR(50) NOT NULL DEFAULT '0',

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`guild_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guilds` (
    `id` VARCHAR(32) NOT NULL,
    `name` VARCHAR(32) NULL,
    `executed_command_number` BIGINT NOT NULL DEFAULT 0,
    `sent_message_number` BIGINT NOT NULL DEFAULT 0,
    `join_number` BIGINT NOT NULL DEFAULT 0,
    `configuration_id` BIGINT NOT NULL,

    UNIQUE INDEX `configuration_id`(`configuration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level_roles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `level` BIGINT NOT NULL,
    `role_id` VARCHAR(32) NOT NULL,
    `configuration_id` BIGINT NOT NULL,

    INDEX `configuration_id`(`configuration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_channels` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(192) NOT NULL,
    `channel_id` VARCHAR(32) NOT NULL,
    `message` TEXT NOT NULL,
    `configuration_id` BIGINT NOT NULL,

    INDEX `configuration_id`(`configuration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permission` (
    `role_id` VARCHAR(32) NOT NULL,
    `permission_id` BIGINT NOT NULL,

    INDEX `permission_id`(`permission_id`),
    PRIMARY KEY (`role_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(32) NOT NULL,
    `name` VARCHAR(128) NULL,
    `guild_id` VARCHAR(32) NOT NULL,

    INDEX `guild_id`(`guild_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rules` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(192) NULL,
    `content` VARCHAR(192) NOT NULL,
    `place` INTEGER NOT NULL,
    `configuration_id` BIGINT NOT NULL,

    INDEX `configuration_id`(`configuration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configurations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `welcome_title` VARCHAR(192) NOT NULL DEFAULT 'A new member !',
    `welcome_message` TEXT NOT NULL,
    `welcome_color` VARCHAR(6) NOT NULL DEFAULT '00FF00',
    `welcome_channel_id` VARCHAR(32) NULL,
    `goodbye_title` VARCHAR(192) NOT NULL DEFAULT 'A member left !',
    `goodbye_message` TEXT NOT NULL,
    `goodbye_color` VARCHAR(6) NOT NULL DEFAULT 'FF0000',
    `goodbye_channel_id` VARCHAR(32) NULL,
    `boost_title` VARCHAR(192) NOT NULL DEFAULT 'A member boost the server !',
    `boost_message` TEXT NOT NULL,
    `boost_color` VARCHAR(6) NOT NULL DEFAULT 'A13DFF',
    `boost_channel_id` VARCHAR(32) NULL,
    `rules_title` VARCHAR(192) NULL,
    `rules_channel_id` VARCHAR(32) NULL,
    `rules_admit_role_id` VARCHAR(32) NULL,
    `log_channel_id` VARCHAR(32) NULL,
    `do_level_role_replaces_old_roles` BIT(1) NOT NULL DEFAULT b'0',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(192) NULL,
    `label` VARCHAR(192) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anti_link_channels` ADD CONSTRAINT `anti_link_channels_ibfk_1` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guild_user` ADD CONSTRAINT `guild_user_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guild_user` ADD CONSTRAINT `guild_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guilds` ADD CONSTRAINT `guilds_ibfk_1` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `level_roles` ADD CONSTRAINT `level_roles_ibfk_1` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `media_channels` ADD CONSTRAINT `media_channels_ibfk_1` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `roles` ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_ibfk_1` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

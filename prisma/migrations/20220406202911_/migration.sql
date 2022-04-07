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

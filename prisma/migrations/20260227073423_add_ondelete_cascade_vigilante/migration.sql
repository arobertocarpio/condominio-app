-- DropForeignKey
ALTER TABLE `Acceso` DROP FOREIGN KEY `Acceso_id_vigilante_fk_fkey`;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id_token` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario_fk` INTEGER NOT NULL,
    `token_hash` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Acceso` ADD CONSTRAINT `Acceso_id_vigilante_fk_fkey` FOREIGN KEY (`id_vigilante_fk`) REFERENCES `Vigilante`(`id_vigilante`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_id_usuario_fk_fkey` FOREIGN KEY (`id_usuario_fk`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

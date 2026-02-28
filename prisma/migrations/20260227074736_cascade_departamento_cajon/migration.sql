-- DropForeignKey
ALTER TABLE `Cajon` DROP FOREIGN KEY `Cajon_id_departamento_fk_fkey`;

-- AddForeignKey
ALTER TABLE `Cajon` ADD CONSTRAINT `Cajon_id_departamento_fk_fkey` FOREIGN KEY (`id_departamento_fk`) REFERENCES `Departamento`(`id_departamento`) ON DELETE CASCADE ON UPDATE CASCADE;

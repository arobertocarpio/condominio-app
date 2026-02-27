-- AlterTable: Add hora_entrada to Visitante
ALTER TABLE `Visitante` ADD COLUMN `hora_entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable: Change num_edificio from VARCHAR to INTEGER and make NOT NULL
ALTER TABLE `Edificio` MODIFY COLUMN `num_edificio` INTEGER NOT NULL;

-- AlterTable: Add num_departamento to Departamento
ALTER TABLE `Departamento` ADD COLUMN `num_departamento` VARCHAR(191) NOT NULL;

-- AlterTable: Add turno and fecha_alta to Vigilante
ALTER TABLE `Vigilante` ADD COLUMN `turno` VARCHAR(191) NULL;
ALTER TABLE `Vigilante` ADD COLUMN `fecha_alta` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

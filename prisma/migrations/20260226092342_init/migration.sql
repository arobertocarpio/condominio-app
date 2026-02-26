-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NULL,
    `intentos_fallidos` INTEGER NOT NULL DEFAULT 0,
    `cuenta_bloq` VARCHAR(191) NOT NULL DEFAULT 'N',
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Edificio` (
    `id_edificio` INTEGER NOT NULL AUTO_INCREMENT,
    `num_edificio` INTEGER NOT NULL,

    PRIMARY KEY (`id_edificio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id_departamento` INTEGER NOT NULL AUTO_INCREMENT,
    `id_edificio_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_departamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Residente` (
    `id_residente` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `id_departamento_fk` INTEGER NOT NULL,
    `id_edificio_fk` INTEGER NOT NULL,
    `id_usuario_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_residente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cajon` (
    `id_cajon` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NULL,
    `id_departamento_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_cajon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visitante` (
    `id_visitante` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `id_departamento_fk` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NULL,
    `id_edificio_fk` INTEGER NOT NULL,
    `activo` VARCHAR(191) NOT NULL DEFAULT 'S',

    PRIMARY KEY (`id_visitante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vigilante` (
    `id_vigilante` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `turno` VARCHAR(191) NULL,
    `fecha_alta` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_usuario_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_vigilante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrador` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario_fk` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matricula` (
    `matricula` VARCHAR(191) NOT NULL,
    `id_residente_fk` INTEGER NULL,
    `id_visitante_fk` INTEGER NULL,

    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acceso` (
    `id_accesos` INTEGER NOT NULL AUTO_INCREMENT,
    `hora_entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hora_salida` DATETIME(3) NULL,
    `matricula_fk` VARCHAR(191) NOT NULL,
    `id_cajon_fk` INTEGER NULL,
    `id_vigilante_fk` INTEGER NOT NULL,
    `id_visitante_fk` INTEGER NULL,

    PRIMARY KEY (`id_accesos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoPago` (
    `id_pago` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NULL,
    `monto` DECIMAL(10, 2) NOT NULL,
    `fecha_ultimopago` DATETIME(3) NULL,
    `fecha_vencimiento` DATETIME(3) NULL,
    `estatus` VARCHAR(191) NULL,
    `id_residente_fk` INTEGER NOT NULL,

    PRIMARY KEY (`id_pago`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anuncio` (
    `id_anuncio` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `mensaje` TEXT NOT NULL,
    `ruta_archivo` VARCHAR(191) NULL,
    `id_admin_fk` INTEGER NOT NULL,
    `fecha_publicacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_anuncio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Departamento` ADD CONSTRAINT `Departamento_id_edificio_fk_fkey` FOREIGN KEY (`id_edificio_fk`) REFERENCES `Edificio`(`id_edificio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residente` ADD CONSTRAINT `Residente_id_departamento_fk_fkey` FOREIGN KEY (`id_departamento_fk`) REFERENCES `Departamento`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residente` ADD CONSTRAINT `Residente_id_edificio_fk_fkey` FOREIGN KEY (`id_edificio_fk`) REFERENCES `Edificio`(`id_edificio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residente` ADD CONSTRAINT `Residente_id_usuario_fk_fkey` FOREIGN KEY (`id_usuario_fk`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cajon` ADD CONSTRAINT `Cajon_id_departamento_fk_fkey` FOREIGN KEY (`id_departamento_fk`) REFERENCES `Departamento`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visitante` ADD CONSTRAINT `Visitante_id_departamento_fk_fkey` FOREIGN KEY (`id_departamento_fk`) REFERENCES `Departamento`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visitante` ADD CONSTRAINT `Visitante_id_edificio_fk_fkey` FOREIGN KEY (`id_edificio_fk`) REFERENCES `Edificio`(`id_edificio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vigilante` ADD CONSTRAINT `Vigilante_id_usuario_fk_fkey` FOREIGN KEY (`id_usuario_fk`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_id_usuario_fk_fkey` FOREIGN KEY (`id_usuario_fk`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_id_residente_fk_fkey` FOREIGN KEY (`id_residente_fk`) REFERENCES `Residente`(`id_residente`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matricula` ADD CONSTRAINT `Matricula_id_visitante_fk_fkey` FOREIGN KEY (`id_visitante_fk`) REFERENCES `Visitante`(`id_visitante`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acceso` ADD CONSTRAINT `Acceso_matricula_fk_fkey` FOREIGN KEY (`matricula_fk`) REFERENCES `Matricula`(`matricula`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acceso` ADD CONSTRAINT `Acceso_id_cajon_fk_fkey` FOREIGN KEY (`id_cajon_fk`) REFERENCES `Cajon`(`id_cajon`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acceso` ADD CONSTRAINT `Acceso_id_vigilante_fk_fkey` FOREIGN KEY (`id_vigilante_fk`) REFERENCES `Vigilante`(`id_vigilante`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acceso` ADD CONSTRAINT `Acceso_id_visitante_fk_fkey` FOREIGN KEY (`id_visitante_fk`) REFERENCES `Visitante`(`id_visitante`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstadoPago` ADD CONSTRAINT `EstadoPago_id_residente_fk_fkey` FOREIGN KEY (`id_residente_fk`) REFERENCES `Residente`(`id_residente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anuncio` ADD CONSTRAINT `Anuncio_id_admin_fk_fkey` FOREIGN KEY (`id_admin_fk`) REFERENCES `Administrador`(`id_admin`) ON DELETE RESTRICT ON UPDATE CASCADE;

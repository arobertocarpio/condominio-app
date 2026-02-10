/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT,
    "intentos_fallidos" INTEGER NOT NULL DEFAULT 0,
    "cuenta_bloq" TEXT NOT NULL DEFAULT 'N',
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Edificio" (
    "id_edificio" SERIAL NOT NULL,
    "num_edificio" INTEGER,

    CONSTRAINT "Edificio_pkey" PRIMARY KEY ("id_edificio")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id_departamento" SERIAL NOT NULL,
    "id_edificio_fk" INTEGER NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id_departamento")
);

-- CreateTable
CREATE TABLE "Residente" (
    "id_residente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "id_departamento_fk" INTEGER NOT NULL,
    "id_edificio_fk" INTEGER NOT NULL,
    "id_usuario_fk" INTEGER NOT NULL,

    CONSTRAINT "Residente_pkey" PRIMARY KEY ("id_residente")
);

-- CreateTable
CREATE TABLE "Cajon" (
    "id_cajon" SERIAL NOT NULL,
    "estado" TEXT,
    "id_departamento_fk" INTEGER NOT NULL,

    CONSTRAINT "Cajon_pkey" PRIMARY KEY ("id_cajon")
);

-- CreateTable
CREATE TABLE "Visitante" (
    "id_visitante" SERIAL NOT NULL,
    "empresa" TEXT,
    "nombre" TEXT NOT NULL,
    "id_departamento_fk" INTEGER NOT NULL,
    "categoria" TEXT,
    "id_edificio_fk" INTEGER NOT NULL,
    "activo" TEXT NOT NULL DEFAULT 'S',

    CONSTRAINT "Visitante_pkey" PRIMARY KEY ("id_visitante")
);

-- CreateTable
CREATE TABLE "Vigilante" (
    "id_vigilante" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "id_usuario_fk" INTEGER NOT NULL,

    CONSTRAINT "Vigilante_pkey" PRIMARY KEY ("id_vigilante")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id_admin" SERIAL NOT NULL,
    "id_usuario_fk" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "Matricula" (
    "matricula" TEXT NOT NULL,
    "id_residente_fk" INTEGER,
    "id_visitante_fk" INTEGER,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "Acceso" (
    "id_accesos" SERIAL NOT NULL,
    "hora_entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hora_salida" TIMESTAMP(3),
    "matricula_fk" TEXT NOT NULL,
    "id_cajon_fk" INTEGER,
    "id_vigilante_fk" INTEGER NOT NULL,
    "id_visitante_fk" INTEGER,

    CONSTRAINT "Acceso_pkey" PRIMARY KEY ("id_accesos")
);

-- CreateTable
CREATE TABLE "EstadoPago" (
    "id_pago" SERIAL NOT NULL,
    "estado" TEXT,
    "monto" DECIMAL(10,2) NOT NULL,
    "fecha_ultimopago" TIMESTAMP(3),
    "fecha_vencimiento" TIMESTAMP(3),
    "estatus" TEXT,
    "id_residente_fk" INTEGER NOT NULL,

    CONSTRAINT "EstadoPago_pkey" PRIMARY KEY ("id_pago")
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id_anuncio" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "ruta_archivo" TEXT,
    "id_admin_fk" INTEGER NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id_anuncio")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_id_edificio_fk_fkey" FOREIGN KEY ("id_edificio_fk") REFERENCES "Edificio"("id_edificio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residente" ADD CONSTRAINT "Residente_id_departamento_fk_fkey" FOREIGN KEY ("id_departamento_fk") REFERENCES "Departamento"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residente" ADD CONSTRAINT "Residente_id_edificio_fk_fkey" FOREIGN KEY ("id_edificio_fk") REFERENCES "Edificio"("id_edificio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residente" ADD CONSTRAINT "Residente_id_usuario_fk_fkey" FOREIGN KEY ("id_usuario_fk") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cajon" ADD CONSTRAINT "Cajon_id_departamento_fk_fkey" FOREIGN KEY ("id_departamento_fk") REFERENCES "Departamento"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitante" ADD CONSTRAINT "Visitante_id_departamento_fk_fkey" FOREIGN KEY ("id_departamento_fk") REFERENCES "Departamento"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitante" ADD CONSTRAINT "Visitante_id_edificio_fk_fkey" FOREIGN KEY ("id_edificio_fk") REFERENCES "Edificio"("id_edificio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vigilante" ADD CONSTRAINT "Vigilante_id_usuario_fk_fkey" FOREIGN KEY ("id_usuario_fk") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_id_usuario_fk_fkey" FOREIGN KEY ("id_usuario_fk") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_id_residente_fk_fkey" FOREIGN KEY ("id_residente_fk") REFERENCES "Residente"("id_residente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matricula" ADD CONSTRAINT "Matricula_id_visitante_fk_fkey" FOREIGN KEY ("id_visitante_fk") REFERENCES "Visitante"("id_visitante") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acceso" ADD CONSTRAINT "Acceso_matricula_fk_fkey" FOREIGN KEY ("matricula_fk") REFERENCES "Matricula"("matricula") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acceso" ADD CONSTRAINT "Acceso_id_cajon_fk_fkey" FOREIGN KEY ("id_cajon_fk") REFERENCES "Cajon"("id_cajon") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acceso" ADD CONSTRAINT "Acceso_id_vigilante_fk_fkey" FOREIGN KEY ("id_vigilante_fk") REFERENCES "Vigilante"("id_vigilante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acceso" ADD CONSTRAINT "Acceso_id_visitante_fk_fkey" FOREIGN KEY ("id_visitante_fk") REFERENCES "Visitante"("id_visitante") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstadoPago" ADD CONSTRAINT "EstadoPago_id_residente_fk_fkey" FOREIGN KEY ("id_residente_fk") REFERENCES "Residente"("id_residente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anuncio" ADD CONSTRAINT "Anuncio_id_admin_fk_fkey" FOREIGN KEY ("id_admin_fk") REFERENCES "Administrador"("id_admin") ON DELETE RESTRICT ON UPDATE CASCADE;

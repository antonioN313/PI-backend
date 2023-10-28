/*
  Warnings:

  - You are about to drop the `insumos produtos base` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lista insumos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produtos base` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `insumos produtos base` DROP FOREIGN KEY `Insumos Produtos Base_idInsumo_fkey`;

-- DropForeignKey
ALTER TABLE `insumos produtos base` DROP FOREIGN KEY `Insumos Produtos Base_idProdutoBase_fkey`;

-- DropForeignKey
ALTER TABLE `lista insumos` DROP FOREIGN KEY `Lista Insumos_idCotacao_fkey`;

-- DropForeignKey
ALTER TABLE `lista insumos` DROP FOREIGN KEY `Lista Insumos_idInsumo_fkey`;

-- DropForeignKey
ALTER TABLE `lista insumos` DROP FOREIGN KEY `Lista Insumos_idProduto_fkey`;

-- DropTable
DROP TABLE `insumos produtos base`;

-- DropTable
DROP TABLE `lista insumos`;

-- DropTable
DROP TABLE `produtos base`;

-- CreateTable
CREATE TABLE `ListaInsumos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL DEFAULT 1,
    `idProduto` INTEGER NOT NULL,
    `idInsumo` INTEGER NOT NULL,
    `idCotacao` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProdutosBase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `observacoes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InsumosProdutosBase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` DOUBLE NOT NULL DEFAULT 1,
    `idProdutoBase` INTEGER NOT NULL,
    `idInsumo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ListaInsumos` ADD CONSTRAINT `ListaInsumos_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListaInsumos` ADD CONSTRAINT `ListaInsumos_idInsumo_fkey` FOREIGN KEY (`idInsumo`) REFERENCES `Insumos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListaInsumos` ADD CONSTRAINT `ListaInsumos_idCotacao_fkey` FOREIGN KEY (`idCotacao`) REFERENCES `Cotacoes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InsumosProdutosBase` ADD CONSTRAINT `InsumosProdutosBase_idProdutoBase_fkey` FOREIGN KEY (`idProdutoBase`) REFERENCES `ProdutosBase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InsumosProdutosBase` ADD CONSTRAINT `InsumosProdutosBase_idInsumo_fkey` FOREIGN KEY (`idInsumo`) REFERENCES `Insumos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

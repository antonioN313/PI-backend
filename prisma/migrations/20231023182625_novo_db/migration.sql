-- CreateTable
CREATE TABLE `Categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categorias_titulo_key`(`titulo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Insumos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `unidadeMedida` VARCHAR(191) NULL,
    `idCategoria` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `contaTipo` ENUM('Fisica', 'Juridica') NOT NULL,
    `pais` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `rua` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `rg` VARCHAR(191) NULL,
    `nomeFantasia` VARCHAR(191) NULL,
    `razaoSocial` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Fornecedores_email_key`(`email`),
    UNIQUE INDEX `Fornecedores_cpf_key`(`cpf`),
    UNIQUE INDEX `Fornecedores_rg_key`(`rg`),
    UNIQUE INDEX `Fornecedores_nomeFantasia_key`(`nomeFantasia`),
    UNIQUE INDEX `Fornecedores_razaoSocial_key`(`razaoSocial`),
    UNIQUE INDEX `Fornecedores_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `contaTipo` ENUM('Fisica', 'Juridica') NOT NULL,
    `nome` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `rg` VARCHAR(191) NULL,
    `cnpj` VARCHAR(191) NULL,
    `razaoSocial` VARCHAR(191) NULL,
    `nomeFantasia` VARCHAR(191) NULL,
    `pais` VARCHAR(191) NULL,
    `cep` VARCHAR(191) NULL,
    `estado` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `rua` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Clientes_email_key`(`email`),
    UNIQUE INDEX `Clientes_cpf_key`(`cpf`),
    UNIQUE INDEX `Clientes_rg_key`(`rg`),
    UNIQUE INDEX `Clientes_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Clientes_razaoSocial_key`(`razaoSocial`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orcamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `validade` DATETIME(3) NULL,
    `dataOrcamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalMaoObra` DOUBLE NULL,
    `totalMateriais` DOUBLE NULL,
    `valorPago` DOUBLE NULL,
    `status` ENUM('Pendente', 'Iniciado', 'Em Processo', 'Concluido') NOT NULL DEFAULT 'Pendente',
    `prazoEstimadoProducao` INTEGER NULL,
    `observacoes` MEDIUMTEXT NULL,
    `idCliente` INTEGER NOT NULL,
    `idPedido` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pagamento` DOUBLE NOT NULL,
    `status` ENUM('Pendente', 'Iniciado', 'Em Processo', 'Concluido') NOT NULL DEFAULT 'Pendente',
    `idOrcamento` INTEGER NOT NULL,

    UNIQUE INDEX `Pedidos_idOrcamento_key`(`idOrcamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `quantidade` INTEGER NULL,
    `valorUnitario` DOUBLE NULL,
    `observacoes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `orcamentoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cotacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `idFornecedor` INTEGER NOT NULL,
    `idInsumo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cotacoes_idFornecedor_key`(`idFornecedor`),
    UNIQUE INDEX `Cotacoes_idInsumo_key`(`idInsumo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lista Insumos` (
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
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoUsuario` ENUM('Serralheiro', 'Administrador', 'Vendedor') NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_cpf_key`(`cpf`),
    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos Base` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `observacoes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Insumos Produtos Base` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` DOUBLE NOT NULL DEFAULT 1,
    `idProdutoBase` INTEGER NOT NULL,
    `idInsumo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Insumos` ADD CONSTRAINT `Insumos_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categorias`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamentos` ADD CONSTRAINT `Orcamentos_idCliente_fkey` FOREIGN KEY (`idCliente`) REFERENCES `Clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_idOrcamento_fkey` FOREIGN KEY (`idOrcamento`) REFERENCES `Orcamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produtos` ADD CONSTRAINT `Produtos_orcamentoId_fkey` FOREIGN KEY (`orcamentoId`) REFERENCES `Orcamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotacoes` ADD CONSTRAINT `Cotacoes_idFornecedor_fkey` FOREIGN KEY (`idFornecedor`) REFERENCES `Fornecedores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cotacoes` ADD CONSTRAINT `Cotacoes_idInsumo_fkey` FOREIGN KEY (`idInsumo`) REFERENCES `Insumos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lista Insumos` ADD CONSTRAINT `Lista Insumos_idProduto_fkey` FOREIGN KEY (`idProduto`) REFERENCES `Produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lista Insumos` ADD CONSTRAINT `Lista Insumos_idInsumo_fkey` FOREIGN KEY (`idInsumo`) REFERENCES `Insumos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lista Insumos` ADD CONSTRAINT `Lista Insumos_idCotacao_fkey` FOREIGN KEY (`idCotacao`) REFERENCES `Cotacoes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Insumos Produtos Base` ADD CONSTRAINT `Insumos Produtos Base_idProdutoBase_fkey` FOREIGN KEY (`idProdutoBase`) REFERENCES `Produtos Base`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Insumos Produtos Base` ADD CONSTRAINT `Insumos Produtos Base_idInsumo_fkey` FOREIGN KEY (`idInsumo`) REFERENCES `Insumos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

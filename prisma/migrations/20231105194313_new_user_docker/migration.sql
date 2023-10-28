-- CreateEnum
CREATE TYPE "contaTipo" AS ENUM ('Fisica', 'Juridica');

-- CreateEnum
CREATE TYPE "produtoTipo" AS ENUM ('Base', 'Customizado');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('Pendente', 'Iniciado', 'Em Processo', 'Concluido');

-- CreateEnum
CREATE TYPE "tipoUsuario" AS ENUM ('Serralheiro', 'Administrador', 'Vendedor');

-- CreateTable
CREATE TABLE "Categorias" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insumos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "unidadeMedida" TEXT,
    "idCategoria" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insumos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedores" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "contaTipo" "contaTipo" NOT NULL,
    "pais" TEXT,
    "cep" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "nome" TEXT,
    "cpf" TEXT,
    "rg" TEXT,
    "nomeFantasia" TEXT,
    "razaoSocial" TEXT,
    "cnpj" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fornecedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "contaTipo" "contaTipo" NOT NULL,
    "nome" TEXT,
    "cpf" TEXT,
    "rg" TEXT,
    "cnpj" TEXT,
    "razaoSocial" TEXT,
    "nomeFantasia" TEXT,
    "pais" TEXT,
    "cep" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamentos" (
    "id" SERIAL NOT NULL,
    "validade" TIMESTAMP(3),
    "dataOrcamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalMaoObra" DOUBLE PRECISION,
    "totalMateriais" DOUBLE PRECISION,
    "status" "status" NOT NULL DEFAULT 'Pendente',
    "prazoEstimadoProducao" INTEGER,
    "observacoes" TEXT,
    "idCliente" INTEGER NOT NULL,
    "idPedido" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orcamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" SERIAL NOT NULL,
    "pagamento" DOUBLE PRECISION NOT NULL,
    "status" "status" NOT NULL DEFAULT 'Pendente',
    "idOrcamento" INTEGER NOT NULL,

    CONSTRAINT "Pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "quantidade" INTEGER,
    "valorUnitario" DOUBLE PRECISION,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orcamentoId" INTEGER NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cotacoes" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "unidade" TEXT NOT NULL,
    "idFornecedor" INTEGER NOT NULL,
    "idInsumo" INTEGER NOT NULL,
    "obsoleta" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cotacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListaInsumos" (
    "id" SERIAL NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "idInsumo" INTEGER NOT NULL,
    "idCotacao" INTEGER,
    "unidade" TEXT,
    "valorUnitario" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListaInsumos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "tipoUsuario" "tipoUsuario" NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutosBase" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProdutosBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsumosProdutosBase" (
    "id" SERIAL NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "idProdutoBase" INTEGER NOT NULL,
    "idInsumo" INTEGER NOT NULL,
    "unidade" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsumosProdutosBase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorias_titulo_key" ON "Categorias"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedores_email_key" ON "Fornecedores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedores_cpf_key" ON "Fornecedores"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedores_rg_key" ON "Fornecedores"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedores_razaoSocial_key" ON "Fornecedores"("razaoSocial");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedores_cnpj_key" ON "Fornecedores"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_email_key" ON "Clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_cpf_key" ON "Clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_rg_key" ON "Clientes"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_cnpj_key" ON "Clientes"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_razaoSocial_key" ON "Clientes"("razaoSocial");

-- CreateIndex
CREATE UNIQUE INDEX "Pedidos_idOrcamento_key" ON "Pedidos"("idOrcamento");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_cpf_key" ON "Usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- AddForeignKey
ALTER TABLE "Insumos" ADD CONSTRAINT "Insumos_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamentos" ADD CONSTRAINT "Orcamentos_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedidos" ADD CONSTRAINT "Pedidos_idOrcamento_fkey" FOREIGN KEY ("idOrcamento") REFERENCES "Orcamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacoes" ADD CONSTRAINT "Cotacoes_idFornecedor_fkey" FOREIGN KEY ("idFornecedor") REFERENCES "Fornecedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cotacoes" ADD CONSTRAINT "Cotacoes_idInsumo_fkey" FOREIGN KEY ("idInsumo") REFERENCES "Insumos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaInsumos" ADD CONSTRAINT "ListaInsumos_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaInsumos" ADD CONSTRAINT "ListaInsumos_idInsumo_fkey" FOREIGN KEY ("idInsumo") REFERENCES "Insumos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaInsumos" ADD CONSTRAINT "ListaInsumos_idCotacao_fkey" FOREIGN KEY ("idCotacao") REFERENCES "Cotacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsumosProdutosBase" ADD CONSTRAINT "InsumosProdutosBase_idProdutoBase_fkey" FOREIGN KEY ("idProdutoBase") REFERENCES "ProdutosBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsumosProdutosBase" ADD CONSTRAINT "InsumosProdutosBase_idInsumo_fkey" FOREIGN KEY ("idInsumo") REFERENCES "Insumos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

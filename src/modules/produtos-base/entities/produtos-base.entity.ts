import { InsumoProdutoBase } from '@prisma/client';

export class ProdutosBase {
  id: number;
  titulo: string;
  observacoes?: string;
  insumosProdutosBase: InsumoProdutoBase[];
  createdAt: Date;
  updatedAt: Date;
}

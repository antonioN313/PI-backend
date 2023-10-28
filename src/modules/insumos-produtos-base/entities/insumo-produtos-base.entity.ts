import { ProdutoBase } from '@prisma/client';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';

export class InsumoProdutosBase {
  id: number;
  quantidade: number;
  idProdutoBase: number;
  idInsumo: number;
  unidade: string;
  produtoBase: ProdutoBase;
  insumo: Insumo;
  createdAt: Date;
  updatedAt: Date;
}

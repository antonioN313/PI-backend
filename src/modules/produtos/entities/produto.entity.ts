import { ListaInsumo } from 'src/modules/lista-insumos/entities/lista-insumo.entity';
import { Orcamento } from 'src/modules/orcamentos/entities/orcamento.entity';

export class Produto {
  id: number;
  titulo: string;
  quantidade?: number;
  valorUnitario?: number;
  observacoes?: string;
  listaInsumos: ListaInsumo[];
  createdAt: Date;
  updatedAt: Date;
  Orcamento?: Orcamento;
  orcamentoId: number;
}

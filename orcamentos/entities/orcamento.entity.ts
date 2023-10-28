import { Cliente } from 'src/modules/clientes/entities/cliente.entity';
import { Produto } from 'src/modules/produtos/entities/produto.entity';
import { status } from '@prisma/client';

export class Orcamento {
  id: Number;
  validade?: Date;
  dataOrcamento: Date;
  totalMaoObra?: number;
  totalMateriais?: number;
  status: status;
  prazoEstimadoProducao?: number;
  observacoes?: string;
  idCliente: number;
  idPedido?: number;
  cliente: Cliente;
  createdAt: Date;
  updatedAt: Date;
  produtos: Produto[];
}

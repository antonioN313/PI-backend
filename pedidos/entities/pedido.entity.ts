import { status } from "@prisma/client";
import { Orcamento } from "../../orcamentos/entities/orcamento.entity";

export class Pedido {
    id: number;
    pagamento: number;
    status: status;
    idOrcamento: number;
    orcamentos: Orcamento;
    createdAt: Date;
    updatedAt: Date; 
}

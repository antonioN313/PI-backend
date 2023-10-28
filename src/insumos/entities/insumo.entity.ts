import { Categoria } from '../../categorias/entities/categoria.entity';

export class Insumo {
  id: number;
  titulo: string;
  descricao?: string;
  unidadeMedida?: string;
  idCategoria?: number;
  categoria?: Categoria;
  createdAt: Date;
  updatedAt: Date;
}

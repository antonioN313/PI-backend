import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Categoria {
  id: number;
  @IsNotEmpty({message: 'O tipo não pode estar vázio'})
  @IsString({message: 'O tipo deve ser uma string'})
  tipo: string;
  @IsNotEmpty({message: 'O titulo não pode estar vázio'})
  @IsString({message: 'O titulo deve ser uma string'})
  titulo: string;
  @IsString({message: 'A descrição deve ser uma string'})
  descricao?: string;
  createdAt: Date;
  updatedAt: Date;
}

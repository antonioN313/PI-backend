import { tipoUsuario } from '@prisma/client';

export class Usuario {
  id: number;
  tipoUsuario: tipoUsuario;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  createdAt: Date;
  updatedAt: Date;
}

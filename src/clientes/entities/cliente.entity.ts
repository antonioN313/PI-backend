import { contaTipo } from '@prisma/client';
import {
    IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class Cliente {
  id: number;
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'O e-mail não é válido' })
  email: string;
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @IsString({ message: 'O telefone não é uma string' })
  telefone: string;
  @IsNotEmpty({ message: 'O tipo da conta não pode estar vazio' })
  @IsEnum(contaTipo, {
    message: 'O tipo da conta não condiz com as opções disponíveis',
  })
  contaTipo: contaTipo;
  @Matches(/^[a-zA-Z -]*$/, { message: 'O nome só pode ter letras' })
  nome?: string;
  cpf?: string;
  rg?: string;
  @IsString({ message: 'O nome fantasia não é uma string' })
  nomeFantasia?: string;
  @IsString({ message: 'A razão social não é uma string' })
  razaoSocial?: string;
  cnpj?: string;
  pais?: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  createdAt: Date;
  updatedAt: Date;
}

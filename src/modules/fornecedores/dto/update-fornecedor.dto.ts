import { PartialType } from '@nestjs/mapped-types';
import { CreateFornecedorDto } from './create-fornecedor.dto';
import { contaTipo } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsNumberString, IsString, Matches, ValidateIf } from 'class-validator';


export class UpdateFornecedorDto extends PartialType(CreateFornecedorDto) {
  @ApiProperty({
    description: 'O email serve para descrever o email do fornecedor',
    example: 'email@gmail.com',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,{
    message: "Insira um endereco de email valido"
  })
  @IsEmail({}, { message: 'O e-mail inserido não é válido' })
  email?: string;

  @ApiProperty({
    description:
      'O telefone serve para descrever o numero de telefone do fornecedor',
    example: '1734112736',
  })
  @IsOptional()
  @IsNumberString({}, { message: 'O telefone inserido não é válido' })
  telefone?: string;

  @ApiProperty({
    description: 'O tipo serve para diferenciar entre pessoa fisica e juridica',
    example: 'Fisica',
  })
  @IsOptional()
  @IsEnum(contaTipo, {
    message: 'O tipo da conta não condiz com as opções disponíveis',
  })
  contaTipo?: contaTipo;
    
  @ApiProperty({
    description: 'O nome serve para identificar o fornecedor, caso seja pessoa fisica',
    example: 'João Pedro',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  @IsString({ message: 'O nome inserido não é válido' })
  nome?: string;

  @ApiProperty({
    description:
      'O CPF serve para identificar o fornecedor, caso seja pessoa fisica',
    example: '02370334029',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  @IsNumberString({}, { message: 'O CPF inserido não é válido' })
  cpf?: string;

  @ApiProperty({
    description:
      'O RG serve para identificar o fornecedor, caso seja pessoa fisica',
    example: '114421225',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  @IsNumberString({}, { message: 'O RG inserido não é válido' })
  rg?: string;

  @ApiProperty({
    description:
      'O nome fantasia serve para identificar o fornecedor, caso seja pessoa juridica',
    example: 'ZawnTech',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  @IsString({ message: 'O nome fantasia inserido não é válido' })
  nomeFantasia?: string;

  @ApiProperty({
    description:
      'A razão social serve para identificar o fornecedor, caso seja pessoa juridica',
    example: 'Industria mecanica modelo Ltda.',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  @IsString({ message: 'A razão social inserida não é válida' })
  razaoSocial?: string;

  @ApiProperty({
    description:
      'O CNPJ serve para identificar o fornecedor, caso seja pessoa juridica',
    example: '31895255000193',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  @IsNumberString({}, { message: 'O CNPJ inserido não é válido' })
  cnpj?: string;

  @ApiProperty({
    description:
      'O pais serve para identificar a região onde o fornecedor se encontra',
    example: 'Brasil',
  })
  @IsOptional()
  @IsString({ message: 'O país inserido não é válido' })
  pais?: string;

  @ApiProperty({
    description:
      'O CEP serve para identificar a região onde o fornecedor se encontra',
    example: '69918170',
  })
  @IsOptional()
  @IsNumberString({}, { message: 'O CEP inserido não é válido' })
  @Matches(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/)
  cep?: string;

  @ApiProperty({
    description:
      'O estado serve para identificar a região onde o fornecedor se encontra',
    example: 'SP',
  })
  @IsOptional()
  @IsString({ message: 'O estado inserido não é válido' })
  estado?: string;

  @ApiProperty({
    description:
      'A cidade serve para identificar a região onde o fornecedor se encontra',
    example: 'Sorocaba',
  })
  @IsOptional()
  @IsString({ message: 'A cidade inserida não é válida' })
  cidade?: string;

  @ApiProperty({
    description:
      'O bairro serve para identificar o local onde o fornecedor se encontra',
    example: 'Vila Barão',
  })
  @IsOptional()
  @IsString({ message: 'O bairro inserido não é válido' })
  bairro?: string;

  @ApiProperty({
    description:
      'A rua serve para identificar o local onde o fornecedor se encontra',
    example: 'Rua Manuel Lourenço Rodrigues',
  })
  @IsOptional()
  @IsString({ message: 'A rua inserida não é válida' })
  rua?: string;

  @ApiProperty({
    description:
      'O numero serve para identificar o local onde o fornecedor se encontra',
    example: '44',
  })
  @IsOptional()
  @IsNumberString({}, { message: 'O numero inserido não é válido' })
  numero?: string;

  @ApiProperty({
    description:
      'O complemento serve para dar informações adicionais para identificar o local onde o fornecedor se encontra',
    example: 'apt. 42',
  })
  @IsOptional()
  @IsString({ message: 'O complemento inserido não é válido' })
  complemento?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateFornecedorDto } from './create-fornecedor.dto';
import { contaTipo } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';

export class UpdateFornecedorDto extends PartialType(CreateFornecedorDto) {
  @ApiProperty({
    description: 'O email serve pare descrever o email do fornecedor',
    example: 'email@gmail.com',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,{
    message: "Insira um endereco de email valido"
  })
  email?: string;
  
  @ApiProperty({
    description: 'O telefone serve para descrever o numero de telefone do fornecedor',
    example: '1734112736',
  })
  @IsOptional()
  @IsString()
  telefone?: string;
  
  @ApiProperty({
    description: 'O tipo serve para diferenciar entre pessoa fisica e juridica',
    example: 'Fisica',
  })
  @IsOptional()
  @IsEnum(contaTipo)
  contaTipo?: contaTipo;
  
  @ApiProperty({
    description: 'O pais serve para identificar a região onde o fornecedor se encontra',
    example: 'Brasil',
  })
  @IsOptional()
  @IsString()
  pais?: string;
  
  @ApiProperty({
    description: 'O CEP serve para identificar a região onde o fornecedor se encontra',
    example: '69918170',
  })
  @IsOptional()
  @IsString()
  @Matches(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/,{
    message: "Insira um CEP valido"
  })
  cep?: string;
  
  @ApiProperty({
    description: 'O estado serve para identificar a região onde o fornecedor se encontra',
    example: 'SP',
  })
  @IsOptional()
  @IsString()
  estado?: string;
  
  @ApiProperty({
    description: 'A cidade serve para identificar a região onde o fornecedor se encontra',
    example: 'Sorocaba',
  })
  @IsOptional()
  @IsString()
  cidade?: string;
  
  @ApiProperty({
    description: 'O bairro serve para identificar o local onde o fornecedor se encontra',
    example: 'Vila Barão',
  })
  @IsOptional()
  @IsString()
  bairro?: string;
  
  @ApiProperty({
    description: 'A rua serve para identificar o local onde o fornecedor se encontra',
    example: 'Rua Manuel Lourenço Rodrigues',
  })
  @IsOptional()
  @IsString()
  rua?: string;
  
  @ApiProperty({
    description: 'O numero serve para identificar o local onde o fornecedor se encontra',
    example: '44',
  })
  @IsOptional()
  @IsString()
  numero?: string;
  
  @ApiProperty({
    description: 'O complemento serve para dar informações adicionais para identificar o local onde o fornecedor se encontra',
    example: 'apt. 42',
  })
  @IsOptional()
  @IsString()
  complemento?: string;
  
  @ApiProperty({
    description: 'O nome serve para identificar o fornecedor, caso seja pessoa fisica',
    example: 'João Pedro',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  nome?: string;
  
  @ApiProperty({
    description: 'O CPF serve para identificar o fornecedor, caso seja pessoa fisica',
    example: '02370334029',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  cpf?: string;
  
  @ApiProperty({
    description: 'O RG serve para identificar o fornecedor, caso seja pessoa fisica',
    example: '114421225',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  rg?: string;
  
  @ApiProperty({
    description: 'O nome fantasia serve para identificar o fornecedor, caso seja pessoa juridica',
    example: 'ZawnTech',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  nomeFantasia?: string;
  
  @ApiProperty({
    description: 'A razão social serve para identificar o fornecedor, caso seja pessoa juridica',
    example: 'Industria mecanica modelo Ltda.',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  razaoSocial?: string;
  
  @ApiProperty({
    description: 'O CNPJ serve para identificar o fornecedor, caso seja pessoa juridica',
    example: '31895255000193',
  })
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  cnpj?: string;
  
}

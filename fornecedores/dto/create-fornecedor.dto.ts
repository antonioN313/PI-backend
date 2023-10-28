import { ApiProperty } from '@nestjs/swagger';
import { contaTipo } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, ValidateIf } from 'class-validator';

export class CreateFornecedorDto {
  @ApiProperty({
    description: 'O email serve pare descrever o email do fornecedor',
    example: 'email@gmail.com',
  })
  @IsNotEmpty({message:'O email não pode estar vazio. Insire um email valido'})
  @IsString()
  @Matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,{
    message: "Insira um endereco de email valido"
  })
  email: string;
  
  @ApiProperty({
    description: 'O telefone serve para descrever o numero de telefone do fornecedor',
    example: '1734112736',
  })
  @IsNotEmpty({message:"O telefone não pode estar vazio. Insire um telefone valido"})
  @IsString()
  telefone: string;
  
  @ApiProperty({
    description: 'O tipo serve para diferenciar entre pessoa fisica e juridica',
    example: 'Fisica',
    enum: contaTipo
  })
  @IsNotEmpty({message:"Selecione apenas entre Fisico e Juridico"})
  @IsEnum(contaTipo)
  contaTipo: contaTipo;
  
  @ApiProperty({
    description: 'O pais serve para identificar a região onde o fornecedor se encontra',
    example: 'Brasil',
  })
  @IsString()
  @IsOptional()
  pais?: string;
  
  @ApiProperty({
    description: 'O CEP serve para identificar a região onde o fornecedor se encontra',
    example: '69918170',
  })
  @IsString()
  @Matches(/^([\d]{2})\.?([\d]{3})\-?([\d]{3})/,{
    message: "Insira um CEP valido"
  })
  @IsOptional()
  cep?: string;
  
  @ApiProperty({
    description: 'O estado serve para identificar a região onde o fornecedor se encontra',
    example: 'SP',
  })
  @IsString()
  @IsOptional()
  estado?: string;
  
  @ApiProperty({
    description: 'A cidade serve para identificar a região onde o fornecedor se encontra',
    example: 'Sorocaba',
  })
  @IsString()
  @IsOptional()
  cidade?: string;
  
  @ApiProperty({
    description: 'O bairro serve para identificar o local onde o fornecedor se encontra',
    example: 'Vila Barão',
  })
  @IsString()
  @IsOptional()
  bairro?: string;
  
  @ApiProperty({
    description: 'A rua serve para identificar o local onde o fornecedor se encontra',
    example: 'Rua Manuel Lourenço Rodrigues',
  })
  @IsString()
  @IsOptional()
  rua?: string;
  
  @ApiProperty({
    description: 'O numero serve para identificar o local onde o fornecedor se encontra',
    example: '44',
  })
  @IsString()
  @IsOptional()
  numero?: string;
  
  @ApiProperty({
    description: 'O complemento serve para dar informações adicionais para identificar o local onde o fornecedor se encontra',
    example: 'apt. 42',
  })
  @IsString()
  @IsOptional()
  complemento?: string;
  
  @ApiProperty({
    description: 'O nome serve para identificar o fornecedor, caso seja pessoa fisica',
    example: 'João Pedro',
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  nome?: string;
  
  @ApiProperty({
    description: 'O CPF serve para identificar o fornecedor, caso seja pessoa fisica',
    example: '02370334029',
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  cpf?: string;
  
  @ApiProperty({
    description: 'O RG serve para identificar o fornecedor, caso seja pessoa fisica',
    example: '114421225',
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Fisica)
  rg?: string;
  
  @ApiProperty({
    description: 'O nome fantasia serve para identificar o fornecedor, caso seja pessoa juridica',
    example: 'ZawnTech',
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  nomeFantasia?: string;
  
  @ApiProperty({
    description: 'A razão social serve para identificar o fornecedor, caso seja pessoa juridica',
    example: 'Industria mecanica modelo Ltda.',
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  razaoSocial?: string;
  
  @ApiProperty({
    description: 'O CNPJ serve para identificar o fornecedor, caso seja pessoa juridica',
    example: '31895255000193',
  })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.contaTipo === contaTipo.Juridica)
  cnpj?: string;
}


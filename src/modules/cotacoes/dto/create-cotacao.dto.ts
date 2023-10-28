import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCotacaoDto {
  @ApiProperty({
    description:
      'A data serve para descrever quando esta cotação foi realizada',
    example: '2023-10-23T17:30:44.382Z',
  })
  @IsNotEmpty({ message: 'A data não pode estar vazia' })
  @IsDateString({},{ message: 'A data inserida não é válida' })
  data: Date;

  @ApiProperty({
    description:
      'O valor serve para descrever o quanto o insumo de uma cotação especifica esta custando',
    example: '100',
  })
  @IsNotEmpty({ message: 'O valor não pode estar vazio' })
  @IsNumber({}, { message: 'O valor inserido não é válido' })
  valor: number;

  @ApiProperty({
    description:
      'O id do fornecedor serve para descrever com qual fornecedor foi realizada a cotação',
    example: '1',
  })
  @IsNumber({}, { message: 'O fornecedor inserido não é válido' })
  @IsNotEmpty({ message: 'O fornecedor não pode estar vazio' })
  idFornecedor: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo esta cotação foi realizada',
    example: '1',
  })
  @IsNotEmpty({ message: 'O insumo não pode estar vazio' })
  @IsNumber({}, { message: 'O insumo inserido não é válido' })
  idInsumo: number;
  
  @ApiProperty({
    description:
      'A unidade serve para descrever as dimensões do insumo',
    example: '1M',
  })
  @IsNotEmpty({ message: 'A unidade não pode estar vazia' })
  @IsString({ message: 'A unidade inserida não é válida' })
  unidade: string;
}

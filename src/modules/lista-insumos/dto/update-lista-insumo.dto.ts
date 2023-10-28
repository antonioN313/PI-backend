import { PartialType } from '@nestjs/mapped-types';
import { CreateListaInsumoDto } from './create-lista-insumo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString, IsString, ValidateIf } from 'class-validator';

export class UpdateListaInsumoDto extends PartialType(CreateListaInsumoDto) {
  @ApiProperty({
    description:
      'A quantidade serve para descrever quantas unidades deste insumo serão necessárias para produzir o produto',
    example: '5',
  })
  @IsNotEmpty({ message: 'A quantidade não pode estar vazia' })
  @IsNumber({}, { message: 'A quantidade inserida não é válida' })
  quantidade: number;

  @ApiProperty({
    description:
      'O id do produto serve para descrever a qual produto que um determinado insumo pertence',
    example: '1',
  })
  @IsNotEmpty({ message: 'O produto não pode estar vazio' })
  @IsNumber({}, { message: 'O produto inserido não é válido' })
  idProduto: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo este lista insumo aponta',
    example: '1',
  })
  @IsNotEmpty({ message: 'O insumo não pode estar vazio' })
  @IsNumber({}, { message: 'O insumo inserido não é válido' })
  idInsumo: number;

  @ApiProperty({
    description:
      'O id da cotação serve para descrever qual a cotação que determinará o custo do insumo',
    example: '5',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsNumber({}, { message: 'A cotação inserida não é válida' })
  idCotacao?: number;

  @ApiProperty({
    description:
      'A unidade serve para descrever as dimensões do insumo',
    example: '1M',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsString({ message: 'A unidade inserida não é válida' })
  unidade?: string;

  @ApiProperty({
    description:
      'O valor unitario serve para descrever qual é o valor do insumo',
    example: '100,00',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsNumberString({},{message: 'O valor unitário inserido não é válido'})
  valorUnitario?: number;
}

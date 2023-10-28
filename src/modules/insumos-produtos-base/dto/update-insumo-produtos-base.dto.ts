import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumosProdutosBaseDto } from './create-insumo-produtos-base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateInsumosProdutosBaseDto extends PartialType(
  CreateInsumosProdutosBaseDto,
) {
  @ApiProperty({
    description:
      'A quantidade serve para descrever quantas unidades deste insumo serão necessárias para produzir o produto',
    example: '5',
  })
  @IsNotEmpty({message: 'A quantidade não pode estar vazia'})
  @IsNumber({},{message: 'A quantidade inserida não é válida'})
  quantidade?: number;

  @ApiProperty({
    description:
      'O id do produto base serve para descrever a qual produto base que um determinado insumo pertence',
    example: '1',
  })
  @IsNotEmpty({message: 'O produto base não pode estar vazio'})
  @IsNumber({},{message: 'O produto base inserido não é válido'})
  idProdutoBase?: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo este insumo produto base aponta',
    example: '1',
  })
  @IsNotEmpty({message: 'O insumo não pode estar vazio'})
  @IsNumber({},{message: 'O insumo inserido não é válido'})
  idInsumo?: number;

  @ApiProperty({
    description:
      'A unidade serve para descrever as dimensões do insumo',
    example: '1M',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsString({ message: 'A unidade inserida não é válida' })
  unidade?: string;
}

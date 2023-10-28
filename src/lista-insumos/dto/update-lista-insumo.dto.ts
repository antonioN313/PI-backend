import { PartialType } from '@nestjs/mapped-types';
import { CreateListaInsumoDto } from './create-lista-insumo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateListaInsumoDto extends PartialType(CreateListaInsumoDto) {
  @ApiProperty({
    description:
      'A quantidade serve para descrever quantas unidades deste insumo serão necessárias para produzir o produto',
    example: '5',
  })
  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @ApiProperty({
    description:
      'O id do produto serve para descrever a qual produto que um determinado insumo pertence',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  idProduto?: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo este lista insumo aponta',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  idInsumo?: number;

  @ApiProperty({
    description:
      'O id da cotação serve para descrever qual a cotação que determinará o custo do insumo',
    example: '5',
  })
  @IsOptional()
  @IsNumber()
  idCotacao?: number;

  unidade?: string;
}

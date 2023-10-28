import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumosProdutosBaseDto } from './create-insumo-produtos-base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateInsumosProdutosBaseDto extends PartialType(
  CreateInsumosProdutosBaseDto,
) {
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
      'O id do produto base serve para descrever a qual produto base que um determinado insumo pertence',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  idProdutoBase?: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo este insumo produto base aponta',
    example: '1',
  })
  @IsOptional()
  @IsNumber()
  idInsumo?: number;

  unidade?: string;
}

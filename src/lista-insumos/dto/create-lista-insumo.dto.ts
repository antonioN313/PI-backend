import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateListaInsumoDto {
  @ApiProperty({
    description:
      'A quantidade serve para descrever quantas unidades deste insumo serão necessárias para produzir o produto',
    example: '5',
  })
  @IsNotEmpty({ message: 'O insumo da lista deve ter uma quantidade' })
  @IsNumber()
  quantidade: number;

  @ApiProperty({
    description:
      'O id do produto serve para descrever a qual produto que um determinado insumo pertence',
    example: '1',
  })
  @IsNotEmpty({message: 'A lista precisa ter a identificação de um produto'})
  @IsNumber()
  idProduto: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo este lista insumo aponta',
    example: '1',
  })
  @IsNotEmpty({message: 'A lista precisa ter a identificação de um insumo'})
  @IsNumber()
  idInsumo: number;

  @ApiProperty({
    description:
      'O id da cotação serve para descrever qual a cotação que determinará o custo do insumo',
    example: '5',
  })
  @IsNotEmpty({message: 'A lista precisa ter a identificação de uma cotacao de um insumo'})
  @IsOptional()
  idCotacao?: number;

  unidade: string;
}

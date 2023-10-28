import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInsumosProdutosBaseDto {
  @ApiProperty({
    description:
      'A quantidade serve para descrever quantas unidades deste insumo serão necessárias para produzir o produto',
    example: '5',
  })
  @IsNotEmpty({message: 'Insira um valor para quantidade'})
  @IsNumber()
  quantidade: number;

  @ApiProperty({
    description:
      'O id do produto base serve para descrever a qual produto base que um determinado insumo pertence',
    example: '1',
  })
  @IsNotEmpty({message: 'A lista precisa ter a identificação de um produto base'})
  @IsNumber()
  idProdutoBase: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo este insumo produto base aponta',
    example: '1',
  })
  @IsNotEmpty({message: 'A lista precisa ter a identificacao de um Insumo'})
  @IsNumber()
  idInsumo: number;

  unidade: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class addProdutoBaseDto {
  @ApiProperty({
    description: 'O id serve para apontar para um produto base',
    example: '1',
  })
  @IsNotEmpty({message: 'O id do produto base não deve estar vazio'})
  @IsNumber({}, {message: 'O id do produto base inserido não é válido'})
  id: number;

  @ApiProperty({
    description:
      'A quantidade serve para descrever quantas unidades deste produto serão necessárias para o orçamento',
    example: '3',
  })
  @IsNotEmpty({message: 'A quantidade do produto base não deve estar vazio'})
  @IsNumber({}, {message: 'A quantidade inserida não é válida'})
  quantidade: number;

  @ApiProperty({
    description:
      'As observações servem para descrever caracteristicas relevantes sobre o produto',
    example: '2" x 6 m',
  })
  @ValidateIf((object, value) => value !== undefined)
  @IsString({message: 'A observação inserida não é válida'})
  observacoes?: string;

  @ApiProperty({
    description:
      'O id do orçamento serve para indentificar qual o orçamento a quem este produto pertence',
    example: '1',
  })
  @IsNotEmpty({message: 'O id do orçamento deve estar vazio'})
  @IsNumber({}, {message: 'O id do orçamento inserido não é válido'})
  orcamentoId: number;
}

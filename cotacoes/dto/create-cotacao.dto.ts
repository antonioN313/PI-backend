import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCotacaoDto {
  @ApiProperty({
    description:
      'A data serve para descrever quando esta cotação foi realizada',
    example: '2023-10-23T17:30:44.382Z',
  })
  @IsDate()
  @IsNotEmpty({ message: 'A cotacao deve apresentar uma data' })
  data: Date;

  @ApiProperty({
    description:
      'O valor serve para descrever o quanto o insumo de uma cotação especifica esta custando',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty({message: 'A cotacao deve apresentar um valor'})
  valor: number;

  @ApiProperty({
    description:
      'O id do fornecedor serve para descrever com qual fornecedor foi realizada a cotação',
    example: 'NK Serralheria',
  })
  @IsNotEmpty({message: 'A cotacao deve um fornecedor relacionado a ela'})
  idFornecedor: number;

  @ApiProperty({
    description:
      'O id do insumo serve para descrever para qual insumo esta cotação foi realizada',
    example: '1',
  })
  @IsNotEmpty({message: 'A cotacao deve um insumo relacionado a ela'})
  idInsumo: number;

  unidade: string;
}

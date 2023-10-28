import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsOptional, IsNumber, IsString, Matches, ValidateIf } from 'class-validator';

export class CreateInsumoDto {
  @ApiProperty({
    description: 'O titulo serve para pesquisar insumos',
    example: 'Tubo de metalon',
  })
  @IsNotEmpty({ message: 'O titulo não pode estar vazio' })
  @IsString({ message: 'O titulo inserido não é válido' })
  titulo: string;

  @ApiProperty({
    description: 'A descrição serve para detalhar o insumo',
    example: '20 x 30 x 6.000 mm',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsString({ message: 'A descrição inserida não é válida' })
  descricao?: string;

  @ApiProperty({
    description:
      'A unidade de medida serve para destacar a forma que o insumo é medido',
    example: 'mm',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsString({ message: 'A unidade de medida inserida não é válida' })
  unidadeMedida?: string;

  @ApiProperty({
    description:
      'O Id da categoria serve para conectar o insumo a uma categoria',
    example: '1',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsNumber({}, { message: 'A categoria inserida não é válida' })
  idCategoria?: number;
}

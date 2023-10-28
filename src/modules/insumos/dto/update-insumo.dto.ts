import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumoDto } from './create-insumo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, ValidateIf,Matches } from 'class-validator';


export class UpdateInsumoDto extends PartialType(CreateInsumoDto) {
  @ApiProperty({
    description: 'O titulo serve para pesquisar insumos',
    example: 'Tubo de metalon',
  })
  @IsOptional()
  @Matches(/^[a-zA-Z -]*$/, { message: 'O nome do insumo só pode ter letras' })
  @IsString({ message: 'O titulo inserido não é válido' })
  titulo?: string;

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

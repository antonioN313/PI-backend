import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches,ValidateIf } from 'class-validator';


export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiProperty({
    description: 'O tipo serve para diferenciar entre material e mão de obra',
    example: 'Material', 
  })

  @IsOptional()
  @Matches(/^[a-zA-Z -]*$/, { message: 'O tipo só pode ter letras' })
  @IsString({message: 'O tipo deve ser uma string'})
  tipo?: string;

  @ApiProperty({
    description: 'O titulo serve para pesquisar as categorias',
    example: 'Metais',
  })

  @IsOptional()
  @IsString({message: 'O titulo deve ser uma string'})
  titulo?: string;

  @ApiProperty({
    description: 'A descrição serve para detalhar a categoria',
    example: 'Grupo de materiais de aço, ferro e aluminio',
  })

  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsString({message: 'A descrição deve ser uma string'})
  descricao?: string;
}

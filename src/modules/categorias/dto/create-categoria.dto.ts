import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches,ValidateIf } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'O tipo serve para diferenciar entre material e mão de obra',
    example: 'Material',
  })
  @IsNotEmpty({ message: 'O tipo não deve ser vazio'})
  @IsString({message: 'O tipo deve ser uma string'})
  tipo: string;

  @ApiProperty({
    description: 'O titulo serve para pesquisar as categorias',
    example: 'Metais',
  })
  @IsNotEmpty({message: 'O titulo não pode estar vázio'})
  @IsString({message: 'O titulo deve ser uma string'})
  titulo: string;

  @ApiProperty({
    description: 'A descrição serve para detalhar a categoria',
    example: 'Grupo de materiais de aço, ferro e aluminio',
  })
  @Matches(/^[a-zA-Z -]*$/, { message: 'A descrição só pode ter letras' })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsString({message: 'A descrição deve ser uma string'})
  descricao?: string;
}

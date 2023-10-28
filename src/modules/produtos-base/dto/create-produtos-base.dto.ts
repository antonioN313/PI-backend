import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString,ValidateIf } from "class-validator";


export class CreateProdutosBaseDto {
  @ApiProperty({
    description:
      'O titulo serve para identificar e pesquisar o produto base',
    example: 'Portão',
  })
  @IsNotEmpty({ message: 'O titulo não pode estar vazio' })
  @IsString({ message: 'O titulo inserido não é válido' })
  titulo: string;
  
  @ApiProperty({
    description:
      'As observações servem para descrever caracteristicas relevantes sobre o produto base',
    example: '2" x 6 m',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsString({ message: 'A observação inserida não é válida' })
  observacoes?: string;
}

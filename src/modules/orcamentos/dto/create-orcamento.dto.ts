import { ApiProperty } from '@nestjs/swagger';
import { status as Status } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateOrcamentoDto {
  @ApiProperty({
    description:
      'A validade serve para descrever até qual data o orçamento será valido',
    example: '2023-10-23T17:30:44.382Z',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsDateString({},{ message: 'A validade inserida não é válida' })
  validade?: Date;

  @ApiProperty({
    description:
      'O total mão de obra serve para descrever o custo total de mão de obra para produzir os itens do orçamento',
    example: '750',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsNumber({}, { message: 'O valor de mão de obra inserido não é válido' })
  totalMaoObra?: number;

  @ApiProperty({
    description:
      'O total materiais serve para descrever o custo total das compras do materiais para produzir os itens do orçamento',
    example: '700',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsNumber({}, { message: 'O valor total de materiais inserido não é válido' })
  totalMateriais?: number;

  @ApiProperty({
    description: 'O status serve para descrever a atual situação do orçamento',
    example: 'Pendente',
  })
  @IsNotEmpty({ message: 'O status não pode estar vazio' })
  @IsEnum(Status, { message: 'O status inserido não é válido' })
  status: Status;

  @ApiProperty({
    description:
      'O prazo estimado de produção serve para descrever uma estimativa de quanto tempo será necessário para concluir o orçamento, descrito em dias',
    example: '90',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsNumber({}, { message: 'O prazo estimado inserido não é válido' })
  prazoEstimadoProducao: number;


  @ApiProperty({
    description:
      'As observações servem para descrever caracteristicas relevantes obre o orçamento',
    example: '2 portões e 1 grade para janela',
  })
  @IsOptional()
  @ValidateIf((object, value) => value !== undefined)
  @IsString({ message: 'A observação inserida não é válida' })
  observacoes?: string;

  @ApiProperty({
    description:
      'O id do cliente serve para indentificar qual o cliente a quem este orçamento pertence',
    example: '1',
  })
  @IsNotEmpty({ message: 'O cliente não pode estar vazio' })
  @IsNumber({}, { message: 'O cliente inserido não é válido' })
  idCliente: number;
}

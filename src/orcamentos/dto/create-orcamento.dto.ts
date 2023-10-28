import { ApiProperty } from '@nestjs/swagger';
import { status as Status } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateOrcamentoDto {
  @ApiProperty({
    description:
      'A validade serve para descrever até qual data o orçamento será valido',
    example: '2023-10-23T17:30:44.382Z',
  })

  @IsOptional()
  @IsDate({message: 'Validade inserida não é uma data'})
  validade?: Date;

  @ApiProperty({
    description:
      'O total mão de obra serve para descrever o custo total de mão de obra para produzir os itens do orçamento',
    example: '750',
  })

  @IsOptional()
  @IsNumber({},{ message: 'Valor total de mão de obra deve ser um numero'})
  totalMaoObra?: number;

  @ApiProperty({
    description:
      'O total materiais serve para descrever o custo total das compras do materiais para produzir os itens do orçamento',
    example: '700',
  })

  @IsOptional()
  @IsNumber({},{ message: 'Valor total de materiais deve ser um numero'})
  totalMateriais?: number;

  @ApiProperty({
    description:
      'O status serve para descrever a atual situação do orçamento',
    example: 'Pendente',
  })
  @IsEnum(Status)
  @IsNotEmpty({ message: 'Status não pode ser vazio'})
  status: Status;

  @ApiProperty({
    description:
      'O prazo estimado de produção serve para descrever uma estimativa de quanto tempo será necessário para concluir o orçamento, descrito em dias',
    example: '90',
  })

  @IsOptional()
  @IsNumber({},{ message: 'Prazo estimado deve ser um numero'})
  prazoEstimadoProducao?: number;

  @ApiProperty({
    description:
      'As observações servem para descrever caracteristicas relevantes obre o orçamento',
    example: '2 portões e 1 grade para janela',
  })

  @IsOptional()
  @IsString({ message: 'Observação não é de um tipo valido'})
  observacoes?: string;

  @ApiProperty({
    description:
      'O id do cliente serve para indentificar qual o cliente a quem este orçamento pertence',
    example: '1',
  })

  @IsNotEmpty({ message: 'Cliente não pode ser vazio'})
  @IsNumber({},{ message: 'Id do cliente deve ser um numero'})
  idCliente: number;
}

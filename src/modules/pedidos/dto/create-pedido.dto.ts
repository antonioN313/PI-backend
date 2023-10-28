import { ApiProperty } from '@nestjs/swagger';
import { status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
export class CreatePedidoDto {
  @ApiProperty({
    description:
      'O pagamento serve para descrever o quanto o cliente pagará no total para o orçamento',
    example: '2400',
  })
  @IsNotEmpty({ message: 'O pagamento não pode estar vazio' })
  @IsNumber({}, { message: 'O pagamento inserido não é válido' })
  pagamento: number;

  @ApiProperty({
    description: 'O status serve para descrever a atual situação do orçamento',
    example: 'Concluido',
  })
  @IsNotEmpty({ message: 'O status não pode estar vazio' })
  @IsEnum(status, { message: 'O status inserido não é válido' })
  status: status;

  @ApiProperty({
    description:
      'O id do orçamento serve para descrever a qual orçamento este pedido pertence',
    example: '1',
  })
  @IsNotEmpty({ message: 'O orçamento não pode estar vazio' })
  @IsNumber({}, { message: 'O orçamento inserido não é válido' })
  idOrcamento: number;
}

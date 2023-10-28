import { ApiProperty } from '@nestjs/swagger';
import { status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
export class CreatePedidoDto {
  @ApiProperty({
    description:
      'O pagamento serve para descrever o quanto o cliente pagará no total para o orçamento',
    example: '2400',
  })
  @IsNotEmpty({message:'Todo pedido necessita do valor do pagamento'})
  @IsNumber()
  pagamento: number;
  
  @ApiProperty({
    description:
      'O status serve para descrever a atual situação do orçamento',
    example: 'Concluido',
  })
  @IsNotEmpty({message: 'O pedido precisa de informacao sobre a stiuacao atual dele'})
  @IsEnum(status)
  status: status;
  
  @ApiProperty({
    description:
      'O id do orçamento serve para descrever a qual orçamento este pedido pertence',
    example: '1',
  })
  @IsNotEmpty({message:'O pedido precisa ter um orcamento que ele faz parte'})
  @IsNumber()
  idOrcamento: number;
}

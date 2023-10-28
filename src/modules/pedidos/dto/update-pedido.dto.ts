import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
    @ApiProperty({
        description:
          'O pagamento serve para descrever o quanto o cliente pagará no total para o orçamento',
        example: '2400',
      })
      @IsOptional()
      @IsNumber({}, { message: 'O pagamento inserido não é válido' })
      pagamento?: number;
      
      @ApiProperty({
        description:
          'O status serve para descrever a atual situação do orçamento',
        example: 'Concluido',
      })
      @IsOptional()
      @IsEnum(status, { message: 'O status inserido não é válido' })
      status?: status;
      
      @ApiProperty({
        description:
          'O id do orçamento serve para descrever a qual orçamento este pedido pertence',
        example: '1',
      })
      @IsOptional()
      @IsNumber({}, { message: 'O orçamento inserido não é válido' })
      idOrcamento?: number;
}

import { Module } from '@nestjs/common';
import { InsumosProdutosBaseService } from './insumos-produtos-base.service';
import { InsumosProdutosBaseController } from './insumos-produtos-base.controller';
import { PrismaService } from '../../databases/prisma.service';

@Module({
  controllers: [InsumosProdutosBaseController],
  providers: [InsumosProdutosBaseService,PrismaService],
})
export class InsumosProdutosBaseModule {}

import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from 'src/databases/prisma.service';
import { ProdutosBaseService } from '../produtos-base/produtos-base.service';
import { InsumoProdutosBase } from '../insumos-produtos-base/entities/insumo-produtos-base.entity';
import { InsumosProdutosBaseService } from '../insumos-produtos-base/insumos-produtos-base.service';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, PrismaService, ProdutosBaseService, InsumosProdutosBaseService],
})
export class ProdutosModule {}

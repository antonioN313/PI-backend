import { Module } from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
import { OrcamentosController } from './orcamentos.controller';
import { PrismaService } from 'src/databases/prisma.service';
import { ProdutosService } from '../produtos/produtos.service';
import { ProdutosBaseService } from '../produtos-base/produtos-base.service';
import { InsumosProdutosBaseService } from '../insumos-produtos-base/insumos-produtos-base.service';

@Module({
  controllers: [OrcamentosController],
  providers: [OrcamentosService, PrismaService, ProdutosService, ProdutosBaseService, InsumosProdutosBaseService],
})
export class OrcamentosModule {}

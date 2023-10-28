import { Module } from '@nestjs/common';
import { CotacoesService } from './cotacoes.service';
import { CotacoesController } from './cotacoes.controller';
import { PrismaService } from 'src/databases/prisma.service';

@Module({
  controllers: [CotacoesController],
  providers: [CotacoesService, PrismaService],
})
export class CotacoesModule {}

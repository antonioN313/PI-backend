import { Module } from '@nestjs/common';
import { ListaInsumosService } from './lista-insumos.service';
import { ListaInsumosController } from './lista-insumos.controller';
import { PrismaService } from 'src/databases/prisma.service';

@Module({
  controllers: [ListaInsumosController],
  providers: [ListaInsumosService, PrismaService],
})
export class ListaInsumosModule {}

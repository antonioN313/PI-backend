import { Module } from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { InsumosController } from './insumos.controller';
import { PrismaService } from 'src/databases/prisma.service';

@Module({
  controllers: [InsumosController],
  providers: [InsumosService, PrismaService],
})
export class InsumosModule {}

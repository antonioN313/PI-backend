import { Module } from '@nestjs/common';
import { ProdutosBaseService } from './produtos-base.service';
import { ProdutosBaseController } from './produtos-base.controller';
import { PrismaService } from 'src/databases/prisma.service';

@Module({
  controllers: [ProdutosBaseController],
  providers: [ProdutosBaseService, PrismaService],
})
export class ProdutosBaseModule {}

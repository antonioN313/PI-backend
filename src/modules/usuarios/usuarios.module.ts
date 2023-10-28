import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from 'src/databases/prisma.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
  exports:[UsuariosService],
})
export class UsuariosModule {}

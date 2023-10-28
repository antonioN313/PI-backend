import { Request } from 'express';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

export interface AuthRequest extends Request {
  user: Usuario;
}

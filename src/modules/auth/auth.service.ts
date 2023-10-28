import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuariosService) {}

 async login(user: Usuario): Promise<UserToken> {
  const payload: UserPayload = {
    sub: user.id,
    email: user.email,
    name: user.nome,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}

async validateUser(email: string, password: string): Promise<Usuario> {
  const user = await this.usuarioService.findByEmail(email);

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (isPasswordValid) {
      return {
        ...user,
        senha: undefined,
      };
    }
  }

  throw new UnauthorizedError(
    'Email address or password provided is incorrect.',
  );
}
}

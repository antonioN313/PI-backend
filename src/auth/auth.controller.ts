
import { Body, Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { ApiTags } from '@nestjs/swagger';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';


@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly usuariosService: UsuariosService ) {}
  
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }
}

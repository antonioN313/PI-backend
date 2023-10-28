import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IsPublic } from '../decorators/is-public.decorator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  @IsPublic()
  async validate(email: string, password: string) {
    return await this.authService.validateUser(email, password);
  }
}

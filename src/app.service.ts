import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.NODE_ENV
      ? String(process.env.NODE_ENV)
      : 'Servidor rodando';
  }
}

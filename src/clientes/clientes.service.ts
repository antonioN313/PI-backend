import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../../databases/prisma.service';

@Injectable()
export class ClientesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByCliente(nome: string, email: string, telefone: string) {
    return await this.prismaService.cliente.findFirst({
      where: { nome, email, telefone },
    });
  }

  async findManyCliente(termo: string) {
    return await this.prismaService.cliente.findMany({
      where: {
        OR: [
          {nome: {contains: termo}},
          {email: {contains: termo}},
          {telefone: {contains: termo}},
        ],
      },
    });
  }

  async countAllCliente() {
    return await this.prismaService.cliente.count({});
  }

  async create(createClienteDto: CreateClienteDto) {
    const cliente = await this.findOneByCliente(
      createClienteDto.nome,
      createClienteDto.email,
      createClienteDto.telefone,
    );
    if (!cliente) {
      return await this.prismaService.cliente.create({
        data: createClienteDto,
      });
    }
    return { data: { message: 'Cliente ja cadastrado' } };
  }

  async findAll() {
    return await this.prismaService.cliente.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.cliente.findFirst({ where: { id } });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return await this.prismaService.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.cliente.delete({ where: { id } });
  }
}

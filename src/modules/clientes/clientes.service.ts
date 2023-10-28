import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../../databases/prisma.service';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllWithPagination(
    page: number,
    perPage: number,
    nome_like?: string,
  ) {
    const skip = (page - 1) * perPage;
    let clientes = Cliente[''];
    if (nome_like) {
      clientes = await this.prismaService.cliente.findMany({
        skip,
        take: perPage,
        where: {
          OR: [
            { nome: { contains: nome_like } },
            { email: { contains: nome_like } },
            { rua: { contains: nome_like } },
            { nomeFantasia: { contains: nome_like } },
            { razaoSocial: { contains: nome_like } },
          ],
        },
      });
    } else {
      clientes = await this.prismaService.cliente.findMany({
        skip,
        take: perPage,
      });
    }

    return clientes;
  }

  async findExistingCliente(id: number, termo: string) {
    if (!termo === undefined) {
      var emailExists = await this.prismaService.cliente.findUnique({
        where: {
          email: termo,
          NOT: {
            id: id,
          },
        },
      });
    }
    if (!termo === undefined) {
      var cpfExists = await this.prismaService.cliente.findUnique({
        where: {
          cpf: termo,
          NOT: {
            id: id,
          },
        },
      });
    }
    if (!termo === undefined) {
      var rgExists = await this.prismaService.cliente.findUnique({
        where: {
          rg: termo,
          NOT: {
            id: id,
          },
        },
      });
    }
    if (!termo === undefined) {
      var cnpjExists = await this.prismaService.cliente.findUnique({
        where: {
          cnpj: termo,
          NOT: {
            id: id,
          },
        },
      });
    }
    if (!termo === undefined) {
      var razaoExists = await this.prismaService.cliente.findUnique({
        where: {
          razaoSocial: termo,
          NOT: {
            id: id,
          },
        },
      });
    }
    if (
      !emailExists &&
      !cpfExists &&
      !rgExists &&
      !cnpjExists &&
      !razaoExists
    ) {
      return await 0;
    }
    return await 1;
  }

  async findManyCliente(termo: string) {
    return await this.prismaService.cliente.findMany({
      where: {
        OR: [
          { nome: { contains: termo } },
          { email: { contains: termo } },
          { telefone: { contains: termo } },
        ],
      },
    });
  }

  async countAllCliente() {
    return await this.prismaService.cliente.count({});
  }

  async create(createClienteDto: CreateClienteDto) {
    if (
      !(await this.findExistingCliente(undefined, createClienteDto.email)) &&
      !(await this.findExistingCliente(undefined, createClienteDto.cpf)) &&
      !(await this.findExistingCliente(undefined, createClienteDto.rg)) &&
      !(await this.findExistingCliente(undefined, createClienteDto.cnpj)) &&
      !(await this.findExistingCliente(undefined, createClienteDto.razaoSocial))
    ) {
      return await this.prismaService.cliente.create({
        data: createClienteDto,
      });
    }

    return { data: { message: 'Cliente com dados repetidos' } };
  }

  async findAll() {
    return await this.prismaService.cliente.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.cliente.findFirst({ where: { id } });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const clienteExists = await this.findOne(id);
    if (clienteExists) {
      if (
        !(await this.findExistingCliente(
          clienteExists.id,
          updateClienteDto.email,
        )) &&
        !(await this.findExistingCliente(
          clienteExists.id,
          updateClienteDto.cpf,
        )) &&
        !(await this.findExistingCliente(
          clienteExists.id,
          updateClienteDto.rg,
        )) &&
        !(await this.findExistingCliente(
          clienteExists.id,
          updateClienteDto.cnpj,
        )) &&
        !(await this.findExistingCliente(
          clienteExists.id,
          updateClienteDto.razaoSocial,
        ))
      ) {
        return await this.prismaService.cliente.update({
          where: { id },
          data: updateClienteDto,
        });
      }
      return { data: { message: 'Cliente com dados repetidos' } };
    }
    return { data: { message: 'Cliente não existe' } };
  }

  async remove(id: number) {
    const clienteExists = await this.findOne(id);
    if (clienteExists) {
      const clienteOrcs = await this.prismaService.orcamento.findFirst({
        where: { idCliente: id },
      });
      if (!clienteOrcs) {
        return await this.prismaService.cliente.delete({ where: { id } });
      }
      return { data: { message: 'Cliente possui orçamentos' } };
    }
    return { data: { message: 'Cliente não existe' } };
  }
}

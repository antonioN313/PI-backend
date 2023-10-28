import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from 'src/databases/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private readonly prismaService: PrismaService) {}
  async countAll() {
    return await this.prismaService.pedido.count({});
  }

  async create(createPedidoDto: CreatePedidoDto) {
    const pedido = await this.findOne(createPedidoDto.idOrcamento);
    if (!pedido) {
      return await this.prismaService.pedido.create({
        data: createPedidoDto,
      });
    }
  }

  async findManyByPagamento(buscaParam: number) {
    
  }

  async findAll() {
    return await this.prismaService.pedido.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.pedido.findFirst({ where: { id } });
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return await this.prismaService.pedido.update({
      where: { id },
      data: updatePedidoDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.pedido.delete({ where: { id } });
  }
}

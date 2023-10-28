import { Injectable } from '@nestjs/common';
import { CreateInsumosProdutosBaseDto } from './dto/create-insumo-produtos-base.dto';
import { UpdateInsumosProdutosBaseDto } from './dto/update-insumo-produtos-base.dto';
import { PrismaService } from '../../databases/prisma.service';

@Injectable()
export class InsumosProdutosBaseService {
  constructor(private readonly prismaService: PrismaService) {}
 
  async create(createInsumosProdutosBaseDto: CreateInsumosProdutosBaseDto) {
    return await this.prismaService.insumoProdutoBase.create({
      data: createInsumosProdutosBaseDto,
    });
  }

  async countAll(){
    return await this.prismaService.insumoProdutoBase.count();
  }

  async findInsumoProdBase(id: number) {
    return await this.prismaService.insumoProdutoBase.findMany({
      where: {
        OR: [
          {idProdutoBase: {equals: id}}
        ],
      },
    });
  }

  async findAll() {
    return await this.prismaService.insumoProdutoBase.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.insumoProdutoBase.findFirst({ where: { id } });
  }

  async update(id: number, updateInsumosProdutosBaseDto: UpdateInsumosProdutosBaseDto) {
    return await this.prismaService.insumoProdutoBase.update({
      where: { id },
      data: updateInsumosProdutosBaseDto,
    })
  }

  async remove(id: number) {
    return await this.prismaService.insumoProdutoBase.delete({ where: { id } })
  }
}

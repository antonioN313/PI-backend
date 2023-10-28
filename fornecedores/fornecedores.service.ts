import { Injectable } from '@nestjs/common';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { PrismaService } from '../../databases/prisma.service';

@Injectable()
export class FornecedoresService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async findOneByFornecedor(nome: string,email: string,telefone:string) {
    return await this.prismaService.fornecedor.findFirst({
      where: { nome,email,telefone },
    });
  }
  async findManyByFornecedor(nome: string,email: string,telefone:string){
    return await this.prismaService.fornecedor.findMany({
      where: {nome,email,telefone}
    })
  }
  async countAllFornecedor(){
    return await this.prismaService.fornecedor.count({
    });
  }
  async create(createFornecedoresDto: CreateFornecedorDto) {
    const cliente = await this.findOneByFornecedor(createFornecedoresDto.nome,createFornecedoresDto.email,createFornecedoresDto.telefone);
    if (!cliente) {
      return await this.prismaService.fornecedor.create({
        data: createFornecedoresDto,
      });
    }
    return { data: { message: 'Cliente ja cadastrado' } };
  }

  async findAll() {
    return await this.prismaService.fornecedor.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.fornecedor.findFirst({where: {id}})
  }

  async update(id: number, updateFornecedoresDto: UpdateFornecedorDto) {
    return await this.prismaService.fornecedor.update({
      where: {id},
      data: updateFornecedoresDto,
    })
  }

  async remove(id: number) {
    return await this.prismaService.fornecedor.delete({where: {id}})
  }
}

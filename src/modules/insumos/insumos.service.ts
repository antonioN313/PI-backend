import { Injectable } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { PrismaService } from 'src/databases/prisma.service';
import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumosService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllWithPagination(page: number, perPage: number, titulo_like: string) {
    const skip = (page - 1) * perPage;
    let  insumos = Insumo[""];
    if(titulo_like){
      insumos = await this.prismaService.insumo.findMany({
      skip,
      take: perPage,
      where:{
        OR: [{ titulo: { contains: titulo_like } },
             { unidadeMedida: { contains: titulo_like } },
             { descricao: { contains: titulo_like } },
             { categoria: {titulo:  { contains: titulo_like }} },
           ],
      },
    });
  }else{
    insumos = await this.prismaService.insumo.findMany({
      skip,
      take: perPage,
    });
  } 


    return  insumos ;
  }

  async findOneByTitle(titulo: string) {
    return await this.prismaService.insumo.findFirst({
      where: { titulo },
    });
  }

  async create(createInsumoDto: CreateInsumoDto) {
    const insumoRepetido = await this.findOneByTitle(createInsumoDto.titulo);
    if (!insumoRepetido) {
      if (createInsumoDto.idCategoria !== undefined) {
        var categoriaExists = await this.prismaService.categoria.findFirst({
          where: { id: createInsumoDto.idCategoria },
        });
      }
      if (
        (createInsumoDto.idCategoria && categoriaExists) ||
        (!createInsumoDto.idCategoria && !categoriaExists)
      ) {
        return await this.prismaService.insumo.create({
          data: createInsumoDto,
        });
      }
      return { data: { message: 'Categoria não existe' } };
    }
    return { data: { message: 'Titulo ja cadastrado' } };
  }

  async findAll() {
    return await this.prismaService.insumo.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.insumo.findFirst({
      where: { id },
    });
  }

  async countAll() {
    return await this.prismaService.insumo.count();
  }

  async update(id: number, updateInsumoDto: UpdateInsumoDto) {
    const insumoRepetido = await this.findOneByTitle(updateInsumoDto.titulo);
    if (!insumoRepetido) {
      if (updateInsumoDto.idCategoria !== undefined) {
        var categoriaExists = await this.prismaService.categoria.findFirst({
          where: { id: updateInsumoDto.idCategoria },
        });
      }
      if (
        (updateInsumoDto.idCategoria && categoriaExists) ||
        (!updateInsumoDto.idCategoria && !categoriaExists)
      ) {
        return await this.prismaService.insumo.update({
          where: { id },
          data: updateInsumoDto,
        });
      }
      return { data: { message: 'Categoria não existe' } };
    }
    return { data: { message: 'Titulo ja cadastrado' } };
  }

  async remove(id: number) {
    const insumoExists = await this.findOne(id);
    if (insumoExists) {
      const insumoProds = await this.prismaService.listaInsumo.findFirst({
        where: { idInsumo: id },
      });
      const insumoProdsBase = await this.prismaService.insumoProdutoBase.findFirst({
        where: { idInsumo: id },
      });
      const insumoCota = await this.prismaService.cotacao.findFirst({
        where: { idInsumo: id },
      });
      if (!insumoProds && !insumoProdsBase && !insumoCota) {
        return await this.prismaService.insumo.delete({ where: { id } });
      }
      return { data: { message: 'Insumo está sendo utilizado em outro local' } };
    }
    return { data: { message: 'Insumo não existe' } };
  }
}

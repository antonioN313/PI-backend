import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../../databases/prisma.service';
import { Categoria } from './entities/categoria.entity';
@Injectable()
export class CategoriasService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllWithPagination(page: number, perPage: number, titulo_like? : string) {
    const skip = (page - 1) * perPage;
    let  categorias = Categoria[""];
    if(titulo_like){
     categorias = await this.prismaService.categoria.findMany({
      skip,
      take: perPage,
      where:{
        OR: [{ titulo: { contains: titulo_like } },
             { tipo: { contains: titulo_like } },],
      },
    });
  }else{
     categorias = await this.prismaService.categoria.findMany({
      skip,
      take: perPage,
    });
  } 
    return  categorias ;
  }

  async findOneByTitle(titulo: string) {
    return await this.prismaService.categoria.findFirst({
      where: { titulo },
    });
  }

  async countAllCategorias() {
    return await this.prismaService.categoria.count({});
  }

  async findManyByTitle(titulo: string) {
    return await this.prismaService.categoria.findMany({
      where: { titulo },
    });
  }

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = await this.findOneByTitle(createCategoriaDto.titulo);
    if (!categoria) {
      return await this.prismaService.categoria.create({
        data: createCategoriaDto,
      });
    }
    return { data: { message: 'Titulo ja cadastrado' } };
  }

  async findAll() {
    return await this.prismaService.categoria.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.categoria.findFirst({ where: { id } });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoriaExists = await this.findOne(id);
    if (categoriaExists) {
      const categoriaRepeated = await this.prismaService.categoria.findFirst({
        where: {
          titulo: updateCategoriaDto.titulo,
          NOT: {
            id: id,
          },
        },
      });
      if (!categoriaRepeated) {
        return await this.prismaService.categoria.update({
          where: { id },
          data: updateCategoriaDto,
        });
      }
      return { data: { message: 'Categoria com titulo repetido' } };
    }
    return { data: { message: 'Categoria não existe' } };
  }

  async remove(id: number) {
    const categoriaExists = await this.findOne(id);
    if (categoriaExists) {
      return await this.prismaService.categoria.delete({ where: { id } });
    }
    return { data: { message: 'Categoria não existe' } };
  }
}

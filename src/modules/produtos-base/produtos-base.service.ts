import { Injectable } from '@nestjs/common';
import { CreateProdutosBaseDto } from './dto/create-produtos-base.dto';
import { UpdateProdutosBaseDto } from './dto/update-produtos-base.dto';
import { PrismaService } from 'src/databases/prisma.service';
import { ProdutosBase } from './entities/produtos-base.entity';

@Injectable()
export class ProdutosBaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllWithPagination(page: number, perPage: number, titulo_like: string) {
    const skip = (page - 1) * perPage;
    let  produtos = ProdutosBase[""];
    if(titulo_like){
      produtos = await this.prismaService.produtoBase.findMany({
      skip,
      take: perPage,
      where:{
        OR: [{ titulo: { contains: titulo_like } },
             { observacoes: { contains: titulo_like } },
             
           ],
      },
    });
  }else{
    produtos = await this.prismaService.produtoBase.findMany({
      skip,
      take: perPage,
    });
  } 


    return  produtos ;
  }

  async findOneByTitle(titulo: string) {
    return await this.prismaService.produtoBase.findFirst({
      where: { titulo },
    });
  }

  async create(createProdutosBaseDto: CreateProdutosBaseDto) {
    const produtoBaseExiste = await this.findOneByTitle(
      createProdutosBaseDto.titulo,
    );
    if (!produtoBaseExiste) {
      return await this.prismaService.produtoBase.create({
        data: createProdutosBaseDto,
      });
    }
    return { data: { message: 'Titulo ja cadastrado' } };
  }

  async countAll() {
    return await this.prismaService.produtoBase.count();
  }

  async findAll() {
    return await this.prismaService.produtoBase.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.produtoBase.findFirst({ where: { id } });
  }

  async update(id: number, updateProdutosBaseDto: UpdateProdutosBaseDto) {
    const produtoBaseExists = await this.findOneByTitle(
      updateProdutosBaseDto.titulo,
    );
    if (!produtoBaseExists) {
      return await this.prismaService.produtoBase.update({
        where: { id },
        data: updateProdutosBaseDto,
      });
    }
    return { data: { message: 'Titulo ja cadastrado' } };
  }

  async remove(id: number) {
    const produtoBaseExists = await this.findOne(id);
    if (produtoBaseExists) {
      const removeInsumosBase =
        await this.prismaService.insumoProdutoBase.deleteMany({
          where: {
            idProdutoBase: id,
          },
        });
      const removeProdutoBase = await this.prismaService.produtoBase.delete({
        where: { id },
      });

      return { removeProdutoBase, removeInsumosBase };
    }
  }
}

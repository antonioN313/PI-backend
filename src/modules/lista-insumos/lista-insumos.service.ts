import { Injectable } from '@nestjs/common';
import { CreateListaInsumoDto } from './dto/create-lista-insumo.dto';
import { UpdateListaInsumoDto } from './dto/update-lista-insumo.dto';
import { PrismaService } from 'src/databases/prisma.service';
import { CotacoesService } from '../cotacoes/cotacoes.service';
import { ListaInsumo } from './entities/lista-insumo.entity';

@Injectable()
export class ListaInsumosService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cotacaoServices: CotacoesService,
  ) {}

  async findAllWithPagination(id:number,page: number, perPage: number, titulo_like: string) {
    const skip = (page - 1) * perPage;

    let  listainsumos = ListaInsumo[""];
  
   
      listainsumos = await this.prismaService.listaInsumo.findMany({
      skip,
      take: perPage,
      where:{
        idProduto:id,
        OR: 
        [{ insumo: {titulo:  { contains: titulo_like }} },
          { cotacao: {fornecedor: { nome:{ contains: titulo_like }}} },
          { cotacao: {fornecedor: { nomeFantasia:{ contains: titulo_like }}} },
          { cotacao: {fornecedor: { razaoSocial:{ contains: titulo_like }}} },
          { unidade: { contains: titulo_like } },
          { insumo: {categoria:  { titulo: { contains: titulo_like }}} },
        ],
      },
    });
    return  listainsumos ;
  }

  async countAll(id:number) {
    return await this.prismaService.listaInsumo.count({
      where:{
        idProduto:id,
      }
    });
  }

  async create(createListaInsumoDto: CreateListaInsumoDto) {
    const insumoExists = await this.prismaService.insumo.findFirst({
      where: { id: createListaInsumoDto.idInsumo },
    });
    if (insumoExists) {
      const produtoExists = await this.prismaService.produto.findFirst({
        where: { id: createListaInsumoDto.idProduto },
      });
      if (produtoExists) {
        if (createListaInsumoDto.idCotacao) {
          var cotacaoExists = await this.prismaService.cotacao.findFirst({
            where: { id: createListaInsumoDto.idCotacao },
          });
        }
        if (cotacaoExists || !createListaInsumoDto.idCotacao) {
          return await this.prismaService.listaInsumo.create({
            data: createListaInsumoDto,
          });
        }
        return { data: { message: 'Cotação não existe' } };
      }
      return { data: { message: 'Produto não existe' } };
    }
    return { data: { message: 'Insumo não existe' } };
  }

  async findAll() {
    return await this.prismaService.listaInsumo.findMany();
  }

  async findOne(id: number) {
    console.log(id)
    console.log(this.prismaService.listaInsumo.findFirst({ where: { id } }));
    return await this.prismaService.listaInsumo.findFirst({ where: { id } });
  }

  async update(id: number, updateListaInsumoDto: UpdateListaInsumoDto) {
    const insumoExists = await this.prismaService.insumo.findFirst({
      where: { id: updateListaInsumoDto.idInsumo },
    });
    if (insumoExists) {
      const produtoExists = await this.prismaService.produto.findFirst({
        where: { id: updateListaInsumoDto.idProduto },
      });
      if (produtoExists) {
        if (updateListaInsumoDto.idCotacao) {
          var cotacaoExists = await this.prismaService.cotacao.findFirst({
            where: { id: updateListaInsumoDto.idCotacao },
          });
        }
        if (cotacaoExists || !updateListaInsumoDto.idCotacao) {
          return await this.prismaService.listaInsumo.update({
            where: { id },
            data: updateListaInsumoDto,
          });
        }
        return { data: { message: 'Cotação não existe' } };
      }
      return { data: { message: 'Produto não existe' } };
    }
    return { data: { message: 'Insumo não existe' } };
  }

  async remove(id: number) {
    const listaInsumoExists = await this.findOne(id);
    if (listaInsumoExists) {
      return await this.prismaService.listaInsumo.delete({
        where: { id },
      });
    }
    return { data: { message: 'Insumo da lista não existe' } };
  }

  async selectCotacao(idItemListaInsumo: number, idCotacao: number) {
    console.log(idItemListaInsumo, idCotacao);
    const cotacao = await this.cotacaoServices.findOne(idCotacao);

    console.log(idItemListaInsumo, idCotacao);
    if (!cotacao) {
      return { data: { message: 'Essa cotação não existe' } };
    }

    const listaInsumoExists = await this.findOne(idItemListaInsumo)
    if (!listaInsumoExists) {
      return { data: { message: 'Esse insumo não existe' } };
    }
    listaInsumoExists.valorUnitario = cotacao.valor;

    listaInsumoExists.idCotacao = cotacao.id;

    return await this.update(listaInsumoExists.id, listaInsumoExists);
  }
}

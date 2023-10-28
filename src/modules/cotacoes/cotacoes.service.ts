import { Injectable } from '@nestjs/common';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';
import { UpdateCotacaoDto } from './dto/update-cotacao.dto';
import { PrismaService } from 'src/databases/prisma.service';
import { recotarDto } from './dto/recotar.dto';
import { Cotacao } from './entities/cotacao.entity';

@Injectable()
export class CotacoesService {
  constructor(private readonly prismaService: PrismaService) {}

  async recotar(idCotacao: number, recotarDto: recotarDto) {
    const oldQuotation = await this.prismaService.cotacao.update({
      where: { id: idCotacao },
      data: {
        obsoleta: true,
      },
    });
    if (!oldQuotation) {
      return { data: { message: 'Não foi possivel criar a nova cotação' } };
    }
    const newQuotation = await this.prismaService.cotacao.create({
      data: {
        idInsumo: oldQuotation.idInsumo,
        idFornecedor: oldQuotation.idFornecedor,
        unidade: oldQuotation.unidade,
        valor: recotarDto.valor,
        data: recotarDto.data,
      },
    });
    if (!newQuotation) {
      return { data: { message: 'Não foi possivel criar a nova cotação' } };
    }

    return newQuotation;
  }

  async findAllWithPagination(id:number,page: number, perPage: number, nome_like? : string,idfornecedor?:number) {
    const skip = (page - 1) * perPage;
    let  cotacoes = Cotacao[""];
    
    if(id && idfornecedor){
      cotacoes = await this.prismaService.cotacao.findMany({
        skip,
        take: perPage,
        where:{
          idInsumo:id,
          idFornecedor:idfornecedor,
          OR: [{ insumo:     { titulo:      { contains: nome_like }} },
               { fornecedor: {nome:         { contains: nome_like }} },
               { fornecedor: {nomeFantasia: { contains: nome_like }} },
               { fornecedor: {razaoSocial:  { contains: nome_like }} },
             ],
        },
      });
    }else if(id){
      cotacoes = await this.prismaService.cotacao.findMany({
        skip,
        take: perPage,
        where:{
          idInsumo:id,
          
          OR: [{ insumo: { titulo: { contains: nome_like } }},
               { fornecedor: {nome:  { contains: nome_like }} },
               { fornecedor: {nomeFantasia:  { contains: nome_like }} },
               { fornecedor: {razaoSocial:  { contains: nome_like }} },
             ],
        },
      });
    }else{
      cotacoes = await this.prismaService.cotacao.findMany({
      skip,
      take: perPage,
      where:{
        OR: [{ insumo: { titulo: { contains: nome_like } }},
             { fornecedor: {nome:  { contains: nome_like }} },
             { fornecedor: {nomeFantasia:  { contains: nome_like }} },
             { fornecedor: {razaoSocial:  { contains: nome_like }} },
           ],
      },
    });
  }
 
    return  cotacoes ;
  }


  async countAllCotacaos() {
    return await this.prismaService.cotacao.count({});
  }

  async countByIdInsumoCotacaos(id: number) {
    return await this.prismaService.cotacao.count({
      where:{
        idInsumo : id
      }
    });
  }


  async create(createCotacaoDto: CreateCotacaoDto) {
    const fornecedorExists = await this.prismaService.fornecedor.findFirst({
      where: { id: createCotacaoDto.idFornecedor },
    });
    if (fornecedorExists) {
      const insumoExists = await this.prismaService.insumo.findFirst({
        where: { id: createCotacaoDto.idInsumo },
      });
      if (insumoExists) {
        return await this.prismaService.cotacao.create({
          data: createCotacaoDto,
        });
      }
      return { data: { message: 'Insumo não existe' } };
    }
    return { data: { message: 'Fornecedor não existe' } };
  }

  async findAll() {
    return await this.prismaService.cotacao.findMany();
  }

  async findManyByFornecedor(id: number) {
    return await this.prismaService.cotacao.findMany({
      where: { idFornecedor: id },
    });
  }

  async findManyByInsumo(id: number) {
    return await this.prismaService.cotacao.findMany({
      where: { idInsumo: id },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.cotacao.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCotacaoDto: UpdateCotacaoDto) {
    const cotacaoExists = await this.findOne(1);
    if (cotacaoExists) {
      const notObsolete = await this.findOne(id);
      if (notObsolete.obsoleta === false) {
        const fornecedorExists = await this.prismaService.fornecedor.findFirst({
          where: { id: updateCotacaoDto.idFornecedor },
        });
        if (fornecedorExists) {
          const insumoExists = await this.prismaService.insumo.findFirst({
            where: { id: updateCotacaoDto.idInsumo },
          });
          if (insumoExists) {
            return await this.prismaService.cotacao.update({
              where: { id },
              data: updateCotacaoDto,
            });
          }
          return { data: { message: 'Insumo não existe' } };
        }
        return { data: { message: 'Fornecedor não existe' } };
      }
      return { data: { message: 'Cotação selecionada é obsoleta' } };
    }
    return { data: { message: 'Cotação não existe' } };
  }

  async remove(id: number) {
    const cotacaoExists = await this.findOne(id);
    if (cotacaoExists) {
      return await this.prismaService.cotacao.delete({ where: { id } });
    }
    return { data: { message: 'Cotação não existe' } };
  }
}

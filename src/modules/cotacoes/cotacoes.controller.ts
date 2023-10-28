import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  Header,
  Res,
} from '@nestjs/common';
import { CotacoesService } from './cotacoes.service';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';
import { UpdateCotacaoDto } from './dto/update-cotacao.dto';
import { ApiTags } from '@nestjs/swagger';
import { recotarDto } from './dto/recotar.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('cotacoes')
@Controller('cotacoes')
export class CotacoesController {
  constructor(private readonly cotacoesService: CotacoesService) { }

  @IsPublic()
  @Post('recotar/:id')
  async recotar(@Param('id') idCotacao: string, @Body() recotarDto: recotarDto) {
    return await this.cotacoesService.recotar(+idCotacao, recotarDto);
  }



  @IsPublic()
  @Get('count')
  async countAll() {
    return await this.cotacoesService.countAllCotacaos();
  }

  @IsPublic()
  @Get('countbyId')
  async countById(id:number) {
    if(id){
      return await this.cotacoesService.countByIdInsumoCotacaos(id);
    }
    return await this.cotacoesService.countAllCotacaos();
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createCotacaoDto: CreateCotacaoDto) {
    return await this.cotacoesService.create(createCotacaoDto);
  }

  @IsPublic()
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Query('fornecedor') idFornecedor: number,@Query('insumo') idInsumo: number, @Query('page') page: number,@Query('perPage') perPage: number,@Query('nome_like') nome_like : string, @Res({ passthrough: true }) res) {
    page = page||1;
    perPage = perPage||await this.countAll();
    const cotacoes = await this.cotacoesService.findAllWithPagination(
      +idInsumo,
      page,
      Number(perPage),
      nome_like,
      +idFornecedor
    );
    const  total = await this.countById(+idInsumo); 
    res.header('x-total-count',total);
    return await cotacoes
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cotacoesService.findOne(+id);
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCotacaoDto: UpdateCotacaoDto) {
    return await this.cotacoesService.update(+id, updateCotacaoDto);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cotacoesService.remove(+id);
  }

  @IsPublic()
  @Get('findByFornecedor/:id')
  async findManyByFornecedor(@Param('id') id: string) {
    return await this.cotacoesService.findManyByFornecedor(+id);
  }

  @IsPublic()
  @Get('findByInsumo/:id')
  async findManyByInsumo(@Param('id') id: string) {
    return await this.cotacoesService.findManyByInsumo(+id);
  }
}

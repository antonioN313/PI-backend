import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CotacoesService } from './cotacoes.service';
import { CreateCotacaoDto } from './dto/create-cotacao.dto';
import { UpdateCotacaoDto } from './dto/update-cotacao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cotacoes')
@Controller('cotacoes')
export class CotacoesController {
  constructor(private readonly cotacoesService: CotacoesService) {}

  @Get('count')
  async countAll() {
    return await this.cotacoesService.countAllCotacaos();
  }
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createCotacaoDto: CreateCotacaoDto) {
    return await this.cotacoesService.create(createCotacaoDto);
  }

  @Get()
  async findAll() {
    return await this.cotacoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cotacoesService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCotacaoDto: UpdateCotacaoDto) {
    return await this.cotacoesService.update(+id, updateCotacaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cotacoesService.remove(+id);
  }

  @Get('findByFornecedor/:id')
  async findManyByFornecedor(@Param('id') id: string) {
    return await this.cotacoesService.findManyByFornecedor(+id);
  }

  @Get('findByInsumo/:id')
  async findManyByInsumo(@Param('id') id: string) {
    return await this.cotacoesService.findManyByInsumo(+id);
  }
}

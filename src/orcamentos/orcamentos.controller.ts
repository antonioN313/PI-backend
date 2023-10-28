
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orcamentos')
@Controller('orcamentos')
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) {}


  @Get('count')
  async countAll() {
    return await this.orcamentosService.countAll();
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createOrcamentoDto: CreateOrcamentoDto) {
    return await this.orcamentosService.create(createOrcamentoDto);
  }

  @Get()
  async findAll() {
    return await this.orcamentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orcamentosService.findOne(+id);
  }
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateOrcamentoDto: UpdateOrcamentoDto) {
    return await this.orcamentosService.update(+id, updateOrcamentoDto);

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orcamentosService.remove(+id);
  }
}

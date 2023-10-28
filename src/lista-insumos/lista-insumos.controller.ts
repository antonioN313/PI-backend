import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ListaInsumosService } from './lista-insumos.service';
import { CreateListaInsumoDto } from './dto/create-lista-insumo.dto';
import { UpdateListaInsumoDto } from './dto/update-lista-insumo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lista-insumos')
@Controller('lista-insumos')
export class ListaInsumosController {
  constructor(private readonly listaInsumosService: ListaInsumosService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createListaInsumoDto: CreateListaInsumoDto) {
    return await this.listaInsumosService.create(createListaInsumoDto);
  }

  @Get()
  async findAll() {
    return await this.listaInsumosService.findAll();
  }

  @Get('produtos/:id')
  async findProdutoOrc(@Param('id') id: number) {
    return await this.listaInsumosService.findInsumoProd(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.listaInsumosService.findOne(+id);
  }
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListaInsumoDto: UpdateListaInsumoDto) {
    return await this.listaInsumosService.update(+id, updateListaInsumoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.listaInsumosService.remove(+id);
  }
}

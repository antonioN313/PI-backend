
import { Controller, Get, Post, Body, Patch, Param, Delete,UsePipes,ValidationPipe } from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('fornecedores')
@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Get('count')
  async countAll(){
    return await this.fornecedoresService.countAllFornecedor();
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() CreateFornecedoresDto: CreateFornecedorDto) {
    return await this.fornecedoresService.create(CreateFornecedoresDto);
  }

  @Get()
  async findAll() {
    return await this.fornecedoresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.fornecedoresService.findOne(+id);
  }
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateFornecedoresDto: UpdateFornecedorDto) {
    return await this.fornecedoresService.update(+id, UpdateFornecedoresDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.fornecedoresService.remove(+id);
  }
}

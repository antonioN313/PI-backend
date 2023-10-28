import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { InsumosProdutosBaseService } from './insumos-produtos-base.service';
import { CreateInsumosProdutosBaseDto } from './dto/create-insumo-produtos-base.dto';
import { UpdateInsumosProdutosBaseDto } from './dto/update-insumo-produtos-base.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('insumos-produtos-base')
@Controller('insumos-produtos-base')
export class InsumosProdutosBaseController {
  constructor(private readonly insumosProdutosBaseService: InsumosProdutosBaseService) {}

  @Get('count')
  async countAll() {
    return await this.insumosProdutosBaseService.countAll();
  }


  @Get('insumoProd/:id')
  findProdutoOrc(@Param('id') id: number)
  {
    return this.insumosProdutosBaseService.findInsumoProdBase(+id);
  }
  
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createInsumosProdutosBaseDto: CreateInsumosProdutosBaseDto) {
    return await this.insumosProdutosBaseService.create(createInsumosProdutosBaseDto);
  }

  @Get()
  async findAll() {
    return await this.insumosProdutosBaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.insumosProdutosBaseService.findOne(+id);
  }
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInsumosProdutosBaseDto: UpdateInsumosProdutosBaseDto) {
    return await this.insumosProdutosBaseService.update(+id, updateInsumosProdutosBaseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.insumosProdutosBaseService.remove(+id);
  }
}

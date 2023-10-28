import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, Header, Res } from '@nestjs/common';
import { InsumosProdutosBaseService } from './insumos-produtos-base.service';
import { CreateInsumosProdutosBaseDto } from './dto/create-insumo-produtos-base.dto';
import { UpdateInsumosProdutosBaseDto } from './dto/update-insumo-produtos-base.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('insumos-produtos-base')
@Controller('insumos-produtos-base')
export class InsumosProdutosBaseController {
  constructor(private readonly insumosProdutosBaseService: InsumosProdutosBaseService) {}

  @IsPublic()
  @Get('count')
  async countAll(idProdutobase: number) {
    return await this.insumosProdutosBaseService.countAll(idProdutobase);
  }

  @IsPublic()
  @Get('insumoProd/:id')
  async findProdutoOrc(@Param('id') id: number)
  {
    return await this.insumosProdutosBaseService.findInsumoProdBase(+id);
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createInsumosProdutosBaseDto: CreateInsumosProdutosBaseDto) {
    return await this.insumosProdutosBaseService.create(createInsumosProdutosBaseDto);
  }

  @IsPublic()
  @Get(":id")
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Param('id') id: string,@Query('page') page: number,@Query('perPage') perPage: number,@Query('titulo_like') busca : string, @Res({ passthrough: true }) res) {
   
    page = page||1;
    perPage = perPage||await this.countAll(+id);
    const insumosBase = await this.insumosProdutosBaseService.findAllWithPagination(
      +id,
      page,
      Number(perPage),
      busca,
      
    );
    const total = await this.insumosProdutosBaseService.countAll(+id); 
    res.header('x-total-count',total);
    return await insumosBase
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.insumosProdutosBaseService.findOne(+id);
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInsumosProdutosBaseDto: UpdateInsumosProdutosBaseDto) {
    return await this.insumosProdutosBaseService.update(+id, updateInsumosProdutosBaseDto);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.insumosProdutosBaseService.remove(+id);
  }
}

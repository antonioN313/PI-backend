import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  Res,
  Header,
} from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('insumos')
@Controller('insumos')
export class InsumosController {
  constructor(private readonly insumosService: InsumosService) {}

  @IsPublic()
  @Get('count')
  async countAll() {
    return await this.insumosService.countAll();
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createInsumoDto: CreateInsumoDto) {
    return await this.insumosService.create(createInsumoDto);
  }

  @IsPublic()
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Query('page') page: number,@Query('perPage') perPage: number,@Query('titulo_like') titulo_like : string, @Res({ passthrough: true }) res) {
    page = page||1;
    perPage = perPage||await this.insumosService.countAll();
    const cotacoes = await this.insumosService.findAllWithPagination(
      page,
      Number(perPage),
      titulo_like
    );
    const total = await this.insumosService.countAll(); 
    res.header('x-total-count',total);
    return await cotacoes
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.insumosService.findOne(+id);
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInsumoDto: UpdateInsumoDto) {
    return await this.insumosService.update(+id, updateInsumoDto);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.insumosService.remove(+id);
  }
}

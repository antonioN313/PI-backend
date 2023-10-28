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
  Header,
  Res,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @IsPublic()
  @Get('count')
  async countAll() {
    return await this.pedidosService.countAll();
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return await this.pedidosService.create(createPedidoDto);
  }

  @IsPublic()
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Query('page') page: number,@Query('perPage') perPage: number,@Query('titulo_like') titulo_like : string, @Res({ passthrough: true }) res) {
    page = page || 1;
    perPage = perPage || await this.countAll();
    const pedidos = await this.pedidosService.findAllWithPagination(
      page,
      Number(perPage),
      titulo_like
    );
    const total = await this.pedidosService.countAll(); 
    res.header('x-total-count',total);
    return await pedidos
  }

  @IsPublic()
  @Get(':id')
   async findOne(@Param('id') id: string) {
    return await this.pedidosService.findOne(+id);
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return await this.pedidosService.update(+id, updatePedidoDto);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pedidosService.remove(+id);
  }
}

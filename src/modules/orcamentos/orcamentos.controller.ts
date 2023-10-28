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
  Query,
  Res,
  Header,
} from '@nestjs/common';
import { OrcamentosService } from './orcamentos.service';
import { CreateOrcamentoDto } from './dto/create-orcamento.dto';
import { UpdateOrcamentoDto } from './dto/update-orcamento.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('orcamentos')
@Controller('orcamentos')
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) { }

  @IsPublic()
  @Get('count')
  async countAll() {
    return await this.orcamentosService.countAll();
  }

  @IsPublic()
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('titulo_like') titulo_like: string,
    @Res({ passthrough: true }) res,
  ) {
    page = page || 1;
    perPage = perPage || (await this.countAll());

    const orcamentos = await this.orcamentosService.findAllWithPagination(
      page,
      Number(perPage),
      titulo_like,
    );
    const total = await this.orcamentosService.countAll();
    res.header('x-total-count', total);
    return await orcamentos;
  }

  @IsPublic()
  @Post()
  async create(@Body() createOrcamentoDto: CreateOrcamentoDto) {
    return await this.orcamentosService.create(createOrcamentoDto);
  }

  @Get('full/:id')
  async findOneFull(@Param('id') id: string) {
    return await this.orcamentosService.findOneFull(+id);
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orcamentosService.findOne(+id);
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrcamentoDto: UpdateOrcamentoDto,
  ) {
    return await this.orcamentosService.update(+id, updateOrcamentoDto);
  }
 
  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orcamentosService.remove(+id);
  }
}

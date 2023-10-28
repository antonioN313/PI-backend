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
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('fornecedores')
@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @IsPublic()
  @Get('count')
  async countAll() {
    return await this.fornecedoresService.countAllFornecedor();
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() CreateFornecedoresDto: CreateFornecedorDto) {
    return await this.fornecedoresService.create(CreateFornecedoresDto);
  }

  @IsPublic()
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Query('page') page: number,@Query('perPage') perPage: number,@Query('nome_like') nome_like : string, @Res({ passthrough: true }) res) {
    page = page||1;
    perPage = perPage||await this.countAll();
    const fornecedores = await this.fornecedoresService.findAllWithPagination(
      page,
      Number(perPage),
      nome_like
    );
    const total = await this.fornecedoresService.countAllFornecedor(); 
    res.header('x-total-count',total);
    return await fornecedores
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.fornecedoresService.findOne(+id);
  }
  
  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateFornecedoresDto: UpdateFornecedorDto,
  ) {
    return await this.fornecedoresService.update(+id, UpdateFornecedoresDto);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.fornecedoresService.remove(+id);
  }
}

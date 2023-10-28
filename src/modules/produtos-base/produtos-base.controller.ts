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
  Header,
  Res,
} from '@nestjs/common';
import { ProdutosBaseService } from './produtos-base.service';
import { CreateProdutosBaseDto } from './dto/create-produtos-base.dto';
import { UpdateProdutosBaseDto } from './dto/update-produtos-base.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@ApiTags('produtos-base')
@Controller('produtos-base')
export class ProdutosBaseController {
  constructor(private readonly produtosBaseService: ProdutosBaseService) {}


  @Get('count')
  async countAll() {
    return await this.produtosBaseService.countAll();
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createProdutosBaseDto: CreateProdutosBaseDto) {
    return await this.produtosBaseService.create(createProdutosBaseDto);
  }

  @IsPublic()
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Query('page') page: number,@Query('perPage') perPage: number,@Query('titulo_like') titulo_like : string, @Res({ passthrough: true }) res) {
    page = page||1;
    perPage = perPage||await this.countAll();
    const produtos = await this.produtosBaseService.findAllWithPagination(
      page,
      Number(perPage),
      titulo_like
    );
    const total = await this.produtosBaseService.countAll(); 
    res.header('x-total-count',total);
    return await produtos
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.produtosBaseService.findOne(+id);
  }
  
  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProdutosBaseDto: UpdateProdutosBaseDto,
  ) {
    return await this.produtosBaseService.update(+id, updateProdutosBaseDto);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.produtosBaseService.remove(+id);
  }
}

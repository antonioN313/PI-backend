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
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('count')
  async countAll() {
    return await this.usuariosService.countAll();
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @IsPublic()
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async findAll(@Query('page') page: number,@Query('perPage') perPage: number,@Query('titulo_like') titulo_like : string, @Res({ passthrough: true }) res) {
    page = page||1;
    perPage = perPage|| await this.countAll();
    const usuarios = await this.usuariosService.findAllWithPagination(
      page,
      Number(perPage),
      titulo_like
    );
    const total = await this.usuariosService.countAll(); 
    res.header('x-total-count',total);
    return await usuarios
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usuariosService.findOne(+id);
  }

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosService.update(+id, updateUsuarioDto);
  }

  @IsPublic()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usuariosService.remove(+id);
  }
}

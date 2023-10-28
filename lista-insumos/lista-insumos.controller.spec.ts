import { Test, TestingModule } from '@nestjs/testing';
import { ListaInsumosController } from './lista-insumos.controller';
import { ListaInsumosService } from './lista-insumos.service';

describe('ListaInsumosController', () => {
  let controller: ListaInsumosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListaInsumosController],
      providers: [ListaInsumosService],
    }).compile();

    controller = module.get<ListaInsumosController>(ListaInsumosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ListaInsumosService } from './lista-insumos.service';

describe('ListaInsumosService', () => {
  let service: ListaInsumosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListaInsumosService],
    }).compile();

    service = module.get<ListaInsumosService>(ListaInsumosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

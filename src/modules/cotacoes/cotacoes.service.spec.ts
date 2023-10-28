import { Test, TestingModule } from '@nestjs/testing';
import { CotacaosService } from './cotacoes.service';

describe('CotacaosService', () => {
  let service: CotacaosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotacaosService],
    }).compile();

    service = module.get<CotacaosService>(CotacaosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { InsumosProdutosBaseService } from './insumos-produtos-base.service';

describe('InsumosProdutosBaseService', () => {
  let service: InsumosProdutosBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsumosProdutosBaseService],
    }).compile();

    service = module.get<InsumosProdutosBaseService>(InsumosProdutosBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

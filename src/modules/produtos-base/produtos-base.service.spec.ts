import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosBaseService } from './produtos-base.service';

describe('ProdutosBaseService', () => {
  let service: ProdutosBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutosBaseService],
    }).compile();

    service = module.get<ProdutosBaseService>(ProdutosBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

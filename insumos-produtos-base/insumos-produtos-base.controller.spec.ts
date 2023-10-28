import { Test, TestingModule } from '@nestjs/testing';
import { InsumosProdutosBaseController } from './insumos-produtos-base.controller';
import { InsumosProdutosBaseService } from './insumos-produtos-base.service';

describe('InsumosProdutosBaseController', () => {
  let controller: InsumosProdutosBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsumosProdutosBaseController],
      providers: [InsumosProdutosBaseService],
    }).compile();

    controller = module.get<InsumosProdutosBaseController>(InsumosProdutosBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

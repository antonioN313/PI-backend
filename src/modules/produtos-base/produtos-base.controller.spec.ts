import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosBaseController } from './produtos-base.controller';
import { ProdutosBaseService } from './produtos-base.service';

describe('ProdutosBaseController', () => {
  let controller: ProdutosBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosBaseController],
      providers: [ProdutosBaseService],
    }).compile();

    controller = module.get<ProdutosBaseController>(ProdutosBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CotacaosController } from './cotacaos.controller';
import { CotacaosService } from './cotacaos.service';

describe('CotacaosController', () => {
  let controller: CotacaosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CotacaosController],
      providers: [CotacaosService],
    }).compile();

    controller = module.get<CotacaosController>(CotacaosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

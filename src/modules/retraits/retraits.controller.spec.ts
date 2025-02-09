import { Test, TestingModule } from '@nestjs/testing';
import { RetraitsController } from './retraits.controller';

describe('RetraitsController', () => {
  let controller: RetraitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetraitsController],
    }).compile();

    controller = module.get<RetraitsController>(RetraitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

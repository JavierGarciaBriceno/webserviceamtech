import { Test, TestingModule } from '@nestjs/testing';
import { AmtechService } from './amtech.service';

describe('AmtechService', () => {
  let service: AmtechService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmtechService],
    }).compile();

    service = module.get<AmtechService>(AmtechService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

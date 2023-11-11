import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { PayablesRepository } from './repositories/payables.repository';

describe('PayablesService', () => {
  let service: PayablesService;
  let repository: PayablesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayablesService,
        {
          provide: PayablesRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PayablesService>(PayablesService);
    repository = module.get<PayablesRepository>(PayablesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});

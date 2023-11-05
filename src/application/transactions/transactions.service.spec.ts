import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './repositories/transactions.repository';
import { PostgresTransactionsRepository } from './repositories/postgres/postgres-transactions.repository';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        TransactionsService,
        {
          provide: TransactionsRepository,
          useClass: PostgresTransactionsRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

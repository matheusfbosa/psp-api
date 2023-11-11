import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getQueueToken } from '@nestjs/bull';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PaymentsService } from './payments.service';
import { TransactionsRepository } from './repositories/transactions.repository';
import { PostgresTransactionsRepository } from './repositories/postgres/postgres-transactions.repository';
import { PayablesRepository } from '../payables/repositories/payables.repository';
import { PostgresPayablesRepository } from '../payables/repositories/postgres/postgres-payables.repository';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [TransactionsController],
      providers: [
        PrismaService,
        TransactionsService,
        PaymentsService,
        {
          provide: getQueueToken('payables-queue'),
          useValue: {
            add: jest.fn(),
            process: jest.fn(),
          },
        },
        {
          provide: TransactionsRepository,
          useClass: PostgresTransactionsRepository,
        },
        {
          provide: PayablesRepository,
          useClass: PostgresPayablesRepository,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

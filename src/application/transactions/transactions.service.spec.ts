import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './repositories/transactions.repository';
import { Transaction } from './entities/transaction.entity';

const transactionFixture: Transaction = {
  userId: 1,
  value: 1.99,
  description: 'Smartband XYZ 3.0',
  paymentMethod: 'debit_card',
  cardNumber: '4111111145551142',
  cardHolder: 'Ozzy Osbourne',
  cardExpiry: '12/23',
  cvv: '737',
};

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: TransactionsRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        TransactionsService,
        {
          provide: TransactionsRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get<TransactionsRepository>(TransactionsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction with the last 4 digits of the card number', async () => {
      const expected: Transaction = {
        ...transactionFixture,
        cardNumber: '1142',
      };
      (repository.create as jest.Mock).mockResolvedValueOnce(expected);

      const result = await service.create(transactionFixture);

      expect(result).toEqual(expected);
      expect(repository.create).toHaveBeenCalledWith(expected);
    });
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const expected: Transaction[] = [transactionFixture];
      (repository.findMany as jest.Mock).mockResolvedValueOnce(expected);

      const result = await service.findAll();

      expect(result).toEqual(expected);
      expect(repository.findMany).toHaveBeenCalled();
    });
  });
});

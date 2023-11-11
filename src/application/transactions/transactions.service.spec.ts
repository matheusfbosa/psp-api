import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getQueueToken } from '@nestjs/bull';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './repositories/transactions.repository';
import { PaymentMethod, Transaction } from './entities/transaction.entity';
import { PaymentsService } from './payments.service';

const transactionFixture: Transaction = {
  userId: 1,
  value: 100.0,
  description: 'Smartband XYZ 3.0',
  paymentMethod: PaymentMethod.DebitCard,
  cardNumber: '4111111145551142',
  cardHolder: 'Ozzy Osbourne',
  cardExpiry: '12/23',
  cvv: '737',
};

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let paymentsService: PaymentsService;
  let transactionsRepository: TransactionsRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        TransactionsService,
        PaymentsService,
        {
          provide: TransactionsRepository,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
          },
        },
        {
          provide: getQueueToken('payables-queue'),
          useValue: {
            add: jest.fn(),
            process: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    paymentsService = module.get<PaymentsService>(PaymentsService);
    transactionsRepository = module.get<TransactionsRepository>(
      TransactionsRepository,
    );
  });

  it('should be defined', () => {
    expect(transactionsService).toBeDefined();
    expect(paymentsService).toBeDefined();
    expect(transactionsRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction with the last 4 digits of the card number', async () => {
      const expected: Transaction = {
        ...transactionFixture,
        cardNumber: '1142',
      };
      (transactionsRepository.create as jest.Mock).mockResolvedValueOnce(
        expected,
      );

      const result = await transactionsService.create(transactionFixture);

      expect(result).toEqual(expected);
      expect(transactionsRepository.create).toHaveBeenCalledWith(expected);
    });
  });

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const expected: Transaction[] = [transactionFixture];
      (transactionsRepository.findMany as jest.Mock).mockResolvedValueOnce(
        expected,
      );

      const result = await transactionsService.findAll();

      expect(result).toEqual(expected);
      expect(transactionsRepository.findMany).toHaveBeenCalled();
    });
  });
});

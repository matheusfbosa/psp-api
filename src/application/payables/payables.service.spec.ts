import { Test, TestingModule } from '@nestjs/testing';
import { PayablesService } from './payables.service';
import { PayablesRepository } from './repositories/payables.repository';
import { BalancePayablesVO } from './vo/balance-payables.vo';
import { Payable, PayableStatus } from './entities/payable.entity';

const payablesFixture: Payable[] = [
  {
    transactionId: 1,
    status: PayableStatus.Paid,
    paymentDate: new Date('2023-11-01'),
    value: 50.0,
  },
  {
    transactionId: 2,
    status: PayableStatus.WaitingFunds,
    paymentDate: new Date('2023-11-01'),
    value: 75.0,
  },
  {
    transactionId: 3,
    status: PayableStatus.WaitingFunds,
    paymentDate: new Date('2023-11-01'),
    value: 25.0,
  },
];

describe('PayablesService', () => {
  let payablesService: PayablesService;
  let payablesRepository: PayablesRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayablesService,
        {
          provide: PayablesRepository,
          useValue: {
            create: jest.fn(),
            findBy: jest.fn(),
          },
        },
      ],
    }).compile();

    payablesService = module.get<PayablesService>(PayablesService);
    payablesRepository = module.get<PayablesRepository>(PayablesRepository);
  });

  it('should be defined', () => {
    expect(payablesService).toBeDefined();
    expect(payablesRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a payable', async () => {
      const payableToCreate = payablesFixture[0];
      const expected: Payable = {
        ...payableToCreate,
        payableId: 1,
      };
      (payablesRepository.create as jest.Mock).mockResolvedValueOnce(expected);

      const result = await payablesService.create(payableToCreate);

      expect(result).toEqual(expected);
      expect(payablesRepository.create).toHaveBeenCalledWith(payableToCreate);
    });
  });

  describe('getBalance', () => {
    it('should return the balance payables for a user', async () => {
      const userId = 1;
      const expectedBalance: BalancePayablesVO = {
        available: 50.0,
        waitingFunds: 100.0,
      };
      (payablesRepository.findBy as jest.Mock).mockResolvedValueOnce(
        payablesFixture,
      );

      const result = await payablesService.getBalance(userId);

      expect(result).toEqual(expectedBalance);
      expect(payablesRepository.findBy).toHaveBeenCalledWith(userId);
    });
  });
});

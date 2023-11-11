import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { ConfigService } from '@nestjs/config';
import { PaymentMethod, Transaction } from './entities/transaction.entity';
import { PayableStatus } from '../payables/entities/payable.entity';

const transactionFixture: Transaction = {
  transactionId: 1,
  userId: 1,
  value: 100.0,
  description: 'Smartband XYZ 3.0',
  paymentMethod: PaymentMethod.DebitCard,
  cardNumber: '4111111145551142',
  cardHolder: 'Ozzy Osbourne',
  cardExpiry: '12/23',
  cvv: '737',
};

describe('PaymentsService', () => {
  let paymentsService: PaymentsService;
  let configService: ConfigService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((envName, defaultValue) => defaultValue),
          },
        },
      ],
    }).compile();

    paymentsService = module.get<PaymentsService>(PaymentsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(paymentsService).toBeDefined();
    expect(configService).toBeDefined();
  });

  it('should calculate the payable for a debit card transaction using 3% fee', () => {
    const debitCardTransaction: Transaction = {
      ...transactionFixture,
      paymentMethod: PaymentMethod.DebitCard,
      createdAt: new Date('2023-11-01'),
    };

    const payable = paymentsService
      .getPaymentStrategy(debitCardTransaction.paymentMethod)
      .calculatePayable(debitCardTransaction);

    expect(payable.transactionId).toBe(debitCardTransaction.transactionId);
    expect(payable.status).toBe(PayableStatus.Paid);
    expect(payable.paymentDate).toBe(debitCardTransaction.createdAt);
    expect(payable.value).toBe(97.0);
  });

  it('should calculate the payable for a credit card transaction using 5% fee', () => {
    const creditCardTransaction: Transaction = {
      ...transactionFixture,
      paymentMethod: PaymentMethod.CreditCard,
      createdAt: new Date('2023-11-01'),
    };
    const expectedPaymentDate = new Date('2023-12-01');

    const payable = paymentsService
      .getPaymentStrategy(creditCardTransaction.paymentMethod)
      .calculatePayable(creditCardTransaction);

    expect(payable.transactionId).toBe(creditCardTransaction.transactionId);
    expect(payable.status).toBe(PayableStatus.WaitingFunds);
    expect(payable.paymentDate).toStrictEqual(expectedPaymentDate);
    expect(payable.value).toBe(95.0);
  });
});

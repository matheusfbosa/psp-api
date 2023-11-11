import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TransactionsModule } from '../src/application/transactions/transactions.module';
import { TransactionsService } from '../src/application/transactions/transactions.service';
import { Transaction } from '../src/application/transactions/entities/transaction.entity';
import { PaymentsService } from '../src/application/transactions/payments.service';
import {
  CreateTransactionDto,
  PaymentMethodDto,
} from '../src/application/transactions/dto/create-transaction.dto';

const transactionFixture: CreateTransactionDto = {
  userId: 1,
  value: 100.0,
  description: 'Smartband XYZ 3.0',
  paymentMethod: PaymentMethodDto.DebitCard,
  cardNumber: '4111111145551142',
  cardHolder: 'Ozzy Osbourne',
  cardExpiry: '12/23',
  cvv: '737',
};

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;
  const transactionsService = {
    findAll: () => [transactionFixture],
    create: (transaction: Transaction) => transaction,
  };
  const paymentsService = {};

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionsModule],
    })
      .overrideProvider(TransactionsService)
      .useValue(transactionsService)
      .overrideProvider(PaymentsService)
      .useValue(paymentsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/transactions (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/transactions')
      .expect(200)
      .expect(transactionsService.findAll());
  });

  it('/api/v1/transactions (POST) - Create transaction', () => {
    return request(app.getHttpServer())
      .post('/api/v1/transactions')
      .send(transactionFixture)
      .expect(201)
      .expect((res) => {
        const createdTransaction = res.body;
        expect(createdTransaction.userId).toBe(transactionFixture.userId);
        expect(createdTransaction.value).toBe(transactionFixture.value);
        expect(createdTransaction.description).toBe(
          transactionFixture.description,
        );
        expect(createdTransaction.paymentMethod).toBe(
          transactionFixture.paymentMethod,
        );
        expect(createdTransaction.cardNumber).toBe(
          transactionFixture.cardNumber,
        );
        expect(createdTransaction.cardHolder).toBe(
          transactionFixture.cardHolder,
        );
        expect(createdTransaction.cardExpiry).toBe(
          transactionFixture.cardExpiry,
        );
        expect(createdTransaction.cvv).toBe(transactionFixture.cvv);
      });
  });
});

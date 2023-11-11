import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TransactionsModule } from '../src/application/transactions/transactions.module';
import { TransactionsService } from '../src/application/transactions/transactions.service';
import { PaymentsService } from '../src/application/transactions/payments.service';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;
  const transactionsService = { findAll: () => ['test'] };
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
});

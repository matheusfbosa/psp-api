import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TransactionsModule } from '../src/application/transactions/transactions.module';
import { TransactionsService } from '../src/application/transactions/transactions.service';

describe('TransactionsController (e2e)', () => {
  let app: INestApplication;
  const transactionsService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionsModule],
    })
      .overrideProvider(TransactionsService)
      .useValue(transactionsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/v1/transactions (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/transactions')
      .expect(200)
      .expect(transactionsService.findAll());
  });
});

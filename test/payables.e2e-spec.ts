import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PayablesModule } from '../src/application/payables/payables.module';
import { PayablesService } from '../src/application/payables/payables.service';
import { BalancePayablesDto } from '../src/application/payables/dto/balance-payables.dto';

describe('PayablesController (e2e)', () => {
  let app: INestApplication;
  const payablesService = {
    getBalance: (_userId: number) => ({
      available: 100.0,
      waitingFunds: 50.0,
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PayablesModule],
    })
      .overrideProvider(PayablesService)
      .useValue(payablesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/payables/balance (GET)', () => {
    return request(app.getHttpServer())
      .get(`/api/v1/payables/balance`)
      .set('userId', '1')
      .expect(200)
      .expect((res) => {
        const balance = res.body as BalancePayablesDto;
        expect(balance).toBeDefined();
        expect(balance.available).toBe(100.0);
        expect(balance.waitingFunds).toBe(50.0);
      });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import { PayablesRepository } from './repositories/payables.repository';
import { PostgresPayablesRepository } from './repositories/postgres/postgres-payables.repository';

describe('PayablesController', () => {
  let controller: PayablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [
        PrismaService,
        PayablesService,
        {
          provide: PayablesRepository,
          useClass: PostgresPayablesRepository,
        },
      ],
    }).compile();

    controller = module.get<PayablesController>(PayablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

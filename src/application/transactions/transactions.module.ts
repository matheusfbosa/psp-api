import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PaymentsService } from './payments.service';
import { PayablesService } from '../payables/payables.service';
import { TransactionsRepository } from './repositories/transactions.repository';
import { PayablesRepository } from '../payables/repositories/payables.repository';
import { PostgresTransactionsRepository } from './repositories/postgres/postgres-transactions.repository';
import { PostgresPayablesRepository } from '../payables/repositories/postgres/postgres-payables.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    PrismaService,
    TransactionsService,
    PaymentsService,
    PayablesService,
    {
      provide: TransactionsRepository,
      useClass: PostgresTransactionsRepository,
    },
    {
      provide: PayablesRepository,
      useClass: PostgresPayablesRepository,
    },
  ],
})
export class TransactionsModule {}

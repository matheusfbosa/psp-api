import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './repositories/transactions.repository';
import { PostgresTransactionsRepository } from './repositories/postgres/postgres-transactions.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    PrismaService,
    TransactionsService,
    {
      provide: TransactionsRepository,
      useClass: PostgresTransactionsRepository,
    },
  ],
})
export class TransactionsModule {}

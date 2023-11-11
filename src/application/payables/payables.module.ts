import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import { PayablesRepository } from './repositories/payables.repository';
import { PostgresPayablesRepository } from './repositories/postgres/postgres-payables.repository';
import { PayablesProcessor } from './payables.processor';

@Module({
  controllers: [PayablesController],
  providers: [
    PrismaService,
    PayablesService,
    {
      provide: PayablesRepository,
      useClass: PostgresPayablesRepository,
    },
    PayablesProcessor,
  ],
})
export class PayablesModule {}

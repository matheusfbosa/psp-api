import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { TransactionsModule } from './application/transactions/transactions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HealthModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

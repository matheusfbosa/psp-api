import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Payable } from './entities/payable.entity';
import { PayablesService } from './payables.service';

@Processor('payables-queue')
export class PayablesProcessor {
  private readonly logger = new Logger(PayablesProcessor.name);

  constructor(private readonly payablesService: PayablesService) {}

  @Process('processPayable')
  async processPayable(job: Job<Payable>) {
    const { data: payable } = job;
    await this.payablesService.create(payable);
    this.logger.debug(
      `Payable of transaction ${payable.transactionId} processed`,
    );
  }
}

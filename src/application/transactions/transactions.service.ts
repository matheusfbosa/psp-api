import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TransactionsRepository } from './repositories/transactions.repository';
import { Transaction } from './entities/transaction.entity';
import { PaymentsService } from './payments.service';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);
  private readonly processorName = 'processPayable';

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly transactionsRepository: TransactionsRepository,
    @InjectQueue('payables-queue') private readonly payablesQueue: Queue,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const { cardNumber, ...remaining } = transaction;
    const lastFourDigits = cardNumber.slice(-4);
    const transactionCreated = await this.transactionsRepository.create({
      ...remaining,
      cardNumber: lastFourDigits,
    });

    this.createPayable(transactionCreated);

    return transactionCreated;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.findMany();
  }

  private async createPayable(transaction: Transaction) {
    const payable = this.paymentsService
      .getPaymentStrategy(transaction.paymentMethod)
      .calculatePayable(transaction);

    await this.payablesQueue.add(this.processorName, payable, {
      attempts: 5,
      backoff: { type: 'exponential' },
      timeout: 3_000,
    });

    this.logger.debug(
      `Payable of transaction ${payable.transactionId} published to payables-queue`,
    );
  }
}

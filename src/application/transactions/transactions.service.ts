import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './repositories/transactions.repository';
import { Transaction } from './entities/transaction.entity';
import { PaymentsService } from './payments.service';
import { PayablesService } from '../payables/payables.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly payablesService: PayablesService,
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const { cardNumber, ...remaining } = transaction;
    const lastFourDigits = cardNumber.slice(-4);
    const transactionCreated = await this.transactionsRepository.create({
      ...remaining,
      cardNumber: lastFourDigits,
    });

    // TODO: payable should be processed async
    this.createPayable(transactionCreated);

    return transactionCreated;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.findMany();
  }

  private createPayable(transaction: Transaction) {
    const payable = this.paymentsService
      .getPaymentStrategy(transaction.paymentMethod)
      .calculatePayable(transaction);
    this.payablesService.create(payable);
  }
}

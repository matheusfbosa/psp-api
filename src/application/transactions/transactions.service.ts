import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './repositories/transactions.repository';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const { cardNumber, ...remaining } = transaction;
    return this.transactionsRepository.create({
      ...remaining,
      cardNumber: cardNumber.slice(-4),
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.findMany();
  }
}

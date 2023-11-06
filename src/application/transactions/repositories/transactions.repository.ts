import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionsRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract findMany(): Promise<Transaction[]>;
}

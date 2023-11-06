import { Injectable } from '@nestjs/common';
import { Transaction as PrismaTransaction } from '@prisma/client';
import { TransactionsRepository } from '../transactions.repository';
import { PrismaService } from '../../../../infrastructure/database/prisma.service';
import { Transaction } from '../../entities/transaction.entity';

@Injectable()
export class PostgresTransactionsRepository implements TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const data = await this.prismaService.transaction.create({
      data: {
        userId: transaction.userId,
        value: transaction.value,
        description: transaction.description,
        paymentMethod: transaction.paymentMethod,
        cardNumber: transaction.cardNumber,
        cardHolder: transaction.cardHolder,
        cardExpiry: transaction.cardExpiry,
        cvv: transaction.cvv,
      },
    });
    return this.toDomain(data);
  }

  async findMany(): Promise<Transaction[]> {
    const prismaTransactions = await this.prismaService.transaction.findMany();
    return prismaTransactions.map(this.toDomain);
  }

  private toDomain(data: PrismaTransaction): Transaction {
    return {
      transactionId: data.id,
      userId: data.userId,
      value: data.value.toNumber(),
      description: data.description,
      paymentMethod: data.paymentMethod,
      cardNumber: data.cardNumber,
      cardHolder: data.cardHolder,
      cardExpiry: data.cardExpiry,
      cvv: data.cvv,
      createdAt: data.createdAt,
    };
  }
}

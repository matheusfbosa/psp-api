import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Controller('/api/v1/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() data: CreateTransactionDto): Promise<Transaction> {
    const transaction = await this.transactionsService.create(
      CreateTransactionDto.toDomain(data),
    );
    return CreateTransactionDto.fromDomain(transaction);
  }

  @Get()
  async findAll(): Promise<Transaction[]> {
    const transactions = await this.transactionsService.findAll();
    return transactions.map(CreateTransactionDto.fromDomain);
  }
}

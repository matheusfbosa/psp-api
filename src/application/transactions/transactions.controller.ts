import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Logger, Post, Body, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('transactions')
@Controller('api/v1/transactions')
export class TransactionsController {
  private readonly logger: Logger = new Logger(TransactionsController.name);

  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CreateTransactionDto,
  })
  @Post()
  async create(
    @Body() data: CreateTransactionDto,
  ): Promise<CreateTransactionDto> {
    this.logger.debug(
      `Create ${data.paymentMethod} transaction for user ${data.userId}`,
    );
    const transaction = await this.transactionsService.create(
      CreateTransactionDto.toDomain(data),
    );
    return CreateTransactionDto.fromDomain(transaction);
  }

  @ApiOperation({ summary: 'List transactions' })
  @ApiResponse({ status: 200, description: 'OK', type: CreateTransactionDto })
  @Get()
  async findAll(): Promise<CreateTransactionDto[]> {
    const transactions = await this.transactionsService.findAll();
    return transactions.map(CreateTransactionDto.fromDomain);
  }
}

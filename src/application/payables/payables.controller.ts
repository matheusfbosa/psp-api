import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Headers } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { BalancePayablesDto } from './dto/balance-payables.dto';

@ApiTags('payables')
@Controller('api/v1/payables')
export class PayablesController {
  constructor(private readonly payablesService: PayablesService) {}

  @ApiOperation({ summary: 'Get balance payables' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: BalancePayablesDto,
  })
  @Get('/balance')
  async getBalance(
    @Headers('userId') userId: string,
  ): Promise<BalancePayablesDto> {
    const balance = await this.payablesService.getBalance(+userId);
    return BalancePayablesDto.fromDomain(balance);
  }
}

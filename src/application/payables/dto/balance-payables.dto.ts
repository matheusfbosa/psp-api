import { ApiProperty } from '@nestjs/swagger';
import { BalancePayablesVO } from '../vo/balance-payables.vo';

export class BalancePayablesDto {
  @ApiProperty({ example: 1.99, description: "Sum of all 'paid' payables" })
  available: number;

  @ApiProperty({
    example: 1.99,
    description: "Sum of all 'waiting_funds' payables",
  })
  waitingFunds: number;

  constructor(available: number, waitingFunds: number) {
    this.available = available;
    this.waitingFunds = waitingFunds;
  }

  static fromDomain(domain: BalancePayablesVO): BalancePayablesDto {
    const available = parseFloat(domain.available.toFixed(2));
    const waitingFunds = parseFloat(domain.waitingFunds.toFixed(2));
    return new BalancePayablesDto(available, waitingFunds);
  }
}

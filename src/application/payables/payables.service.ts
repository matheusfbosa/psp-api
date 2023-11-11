import { Injectable } from '@nestjs/common';
import { PayablesRepository } from './repositories/payables.repository';
import { BalancePayablesVO } from './vo/balance-payables.vo';
import { Payable, PayableStatus } from './entities/payable.entity';

@Injectable()
export class PayablesService {
  constructor(private readonly payablesRepository: PayablesRepository) {}

  create(payable: Payable): Promise<Payable> {
    return this.payablesRepository.create(payable);
  }

  async getBalance(userId: number): Promise<BalancePayablesVO> {
    const payables: Payable[] = await this.payablesRepository.findBy(userId);

    const initialState = {
      [PayableStatus.Paid]: 0,
      [PayableStatus.WaitingFunds]: 0,
    };
    const {
      [PayableStatus.Paid]: availableBalance,
      [PayableStatus.WaitingFunds]: waitingFundsBalance,
    } = payables.reduce((acc, payable) => {
      acc[payable.status] += payable.value;
      return acc;
    }, initialState);

    return new BalancePayablesVO(availableBalance, waitingFundsBalance);
  }
}

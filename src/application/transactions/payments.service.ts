import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentMethod, Transaction } from './entities/transaction.entity';
import { Payable, PayableStatus } from '../payables/entities/payable.entity';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  private paymentStrategies = new Map<PaymentMethod, PaymentStrategy>([
    [
      PaymentMethod.DebitCard,
      new DebitCardPaymentStrategy(
        this.configService.get('DEBIT_CARD_FEE_PERCENTAGE', 3),
      ),
    ],
    [
      PaymentMethod.CreditCard,
      new CreditCardPaymentStrategy(
        this.configService.get('CREDIT_CARD_FEE_PERCENTAGE', 5),
      ),
    ],
  ]);

  getPaymentStrategy: (paymentMethod: PaymentMethod) => PaymentStrategy = (
    paymentMethod,
  ) => {
    if (this.paymentStrategies.has(paymentMethod)) {
      return this.paymentStrategies.get(paymentMethod)!;
    }
    throw new Error(`Invalid payment method: ${paymentMethod}`);
  };
}

export interface PaymentStrategy {
  calculatePayable(transaction: Transaction): Payable;
}

class DebitCardPaymentStrategy implements PaymentStrategy {
  constructor(private readonly feePercentage: number) {}

  calculatePayable(transaction: Transaction): Payable {
    const fee = transaction.value * (this.feePercentage / 100);
    return {
      transactionId: transaction.transactionId!,
      status: PayableStatus.Paid,
      paymentDate: transaction.createdAt!,
      value: transaction.value - fee,
    };
  }
}

class CreditCardPaymentStrategy implements PaymentStrategy {
  constructor(private readonly feePercentage: number) {}

  calculatePayable(transaction: Transaction): Payable {
    const paymentDate = new Date(transaction.createdAt!);
    paymentDate.setDate(paymentDate.getDate() + 30);
    const fee = transaction.value * (this.feePercentage / 100);
    return {
      transactionId: transaction.transactionId!,
      status: PayableStatus.WaitingFunds,
      paymentDate,
      value: transaction.value - fee,
    };
  }
}

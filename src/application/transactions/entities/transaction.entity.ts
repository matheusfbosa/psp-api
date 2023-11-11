export class Transaction {
  transactionId?: number;
  userId: number;
  value: number;
  description: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cvv: string;
  createdAt?: Date;
}

export enum PaymentMethod {
  DebitCard = 'debit_card',
  CreditCard = 'credit_card',
}

export const getPaymentMethodFromString: (value: string) => PaymentMethod = (
  value,
) => {
  const paymentMethod = Object.values(PaymentMethod).find(
    (enumValue) => enumValue === value,
  );
  if (paymentMethod) return paymentMethod;
  throw new Error(`Invalid payment method: ${value}`);
};

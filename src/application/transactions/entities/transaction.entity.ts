export class Transaction {
  transactionId?: number;
  userId: number;
  value: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cvv: string;
  createdAt?: Date;
}

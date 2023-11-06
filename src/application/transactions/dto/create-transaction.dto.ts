import { Type, instanceToPlain, plainToInstance } from 'class-transformer';
import {
  IsCreditCard,
  IsIn,
  IsInt,
  IsNumber,
  IsNumberString,
  Length,
} from 'class-validator';
import { Transaction } from '../entities/transaction.entity';

const paymentMethods = ['debit_card', 'credit_card'];

export class CreateTransactionDto {
  @IsInt()
  userId: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @Length(3, 100)
  description: string;

  @IsIn(paymentMethods)
  paymentMethod: string;

  @IsCreditCard()
  cardNumber: string;

  @Length(3, 30)
  cardHolder: string;

  @Length(5, 5)
  cardExpiry: string;

  @IsNumberString()
  @Length(3, 3)
  cvv: string;

  static toDomain(dto: CreateTransactionDto): Transaction {
    const plain = instanceToPlain(dto);
    return plainToInstance(Transaction, plain);
  }

  static fromDomain(domain: Transaction): CreateTransactionDto {
    const plain = instanceToPlain(domain);
    return plainToInstance(CreateTransactionDto, plain);
  }
}

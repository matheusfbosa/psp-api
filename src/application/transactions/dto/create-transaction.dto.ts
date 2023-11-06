import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1.99, description: 'Transaction value' })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @ApiProperty({
    example: 'Smartband XYZ 3.0',
    description: 'Transaction description',
  })
  @Length(3, 100)
  description: string;

  @ApiProperty({ enum: paymentMethods, description: 'Payment method' })
  @IsIn(paymentMethods)
  paymentMethod: string;

  @ApiProperty({ example: '4111111145551142', description: 'Card number' })
  @IsCreditCard()
  cardNumber: string;

  @ApiProperty({ example: 'Ozzy Osbourne', description: 'Card holder' })
  @Length(3, 30)
  cardHolder: string;

  @ApiProperty({ example: '12/23', description: 'Card expiry' })
  @Length(5, 5)
  cardExpiry: string;

  @ApiProperty({ example: '737', description: 'Card CVV' })
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

import { Injectable } from '@nestjs/common';
import { Payable as PrismaPayable } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/database/prisma.service';
import { PayablesRepository } from '../payables.repository';
import {
  Payable,
  getPayableStatusFromString,
} from '../../entities/payable.entity';

@Injectable()
export class PostgresPayablesRepository implements PayablesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payable: Payable): Promise<Payable> {
    const data = await this.prismaService.payable.create({
      data: {
        transactionId: payable.transactionId,
        status: payable.status,
        paymentDate: payable.paymentDate,
        value: payable.value,
      },
    });
    return this.toDomain(data);
  }

  async findBy(userId: number): Promise<Payable[]> {
    const prismaPayables = await this.prismaService.payable.findMany({
      where: {
        transaction: {
          userId: userId,
        },
      },
    });
    return prismaPayables.map(this.toDomain);
  }

  private toDomain(data: PrismaPayable): Payable {
    return {
      payableId: data.id,
      transactionId: data.transactionId,
      status: getPayableStatusFromString(data.status),
      paymentDate: data.paymentDate,
      value: data.value.toNumber(),
    };
  }
}

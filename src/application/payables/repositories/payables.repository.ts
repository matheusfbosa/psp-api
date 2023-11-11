import { Payable } from '../entities/payable.entity';

export abstract class PayablesRepository {
  abstract create(payable: Payable): Promise<Payable>;
  abstract findBy(userId: number): Promise<Payable[]>;
}

export class BalancePayablesVO {
  available: number;
  waitingFunds: number;

  constructor(available: number, waitingFunds: number) {
    this.available = available;
    this.waitingFunds = waitingFunds;
  }
}

export class Payable {
  payableId?: number;
  transactionId: number;
  status: PayableStatus;
  paymentDate: Date;
  value: number;
}

export enum PayableStatus {
  Paid = 'paid',
  WaitingFunds = 'waiting_funds',
}

export const getPayableStatusFromString: (value: string) => PayableStatus = (
  value,
) => {
  const status = Object.values(PayableStatus).find(
    (enumValue) => enumValue === value,
  );
  if (status) return status;
  throw new Error(`Invalid payable status: ${value}`);
};

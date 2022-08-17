import { PrismaClient } from '@prisma/client';
import { Balance } from './BalanceEntity';

export interface IBalanceRepository {
  createBalance(balance: Balance): Promise<Balance>;
}

export class BalanceRepository implements IBalanceRepository {
  constructor(private database: PrismaClient) {
    Object.assign(this, database);
  }

  async createBalance(balance: Balance): Promise<Balance> {
    return this.database.balance.create({
      data: balance
    });
  }
}

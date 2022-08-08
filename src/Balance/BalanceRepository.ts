import { PrismaClient } from '@prisma/client';
import { Balance } from './Entity';

export interface IBalanceRepository {
  createBalance(balance: Balance): Promise<Balance>;
}

export class BalanceRepository implements IBalanceRepository {
  constructor(private databaseAccess: PrismaClient) {
    Object.assign(this, databaseAccess);
  }

  async createBalance(balance: Balance): Promise<Balance> {
    return this.databaseAccess.balance.create(balance);
  }
}

import prisma from '../../../prisma';
import { BalanceRepository } from '../BalanceRepository';
import { CreateBalanceUseCase } from './CreateBalanceUseCase';

const balanceRepository = new BalanceRepository(prisma);
const createBalanceUseCase = new CreateBalanceUseCase(balanceRepository);

export { createBalanceUseCase };

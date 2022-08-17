import { prisma } from '../../../prisma';
import { IdentityRepository } from '../../Identity/IdentityRepository';
import { ReadIdentityUseCase } from '../../Identity/useCases/readIdentityUseCase';
import { BalanceRepository } from '../BalanceRepository';
import { CreateBalanceUseCase } from './CreateBalanceUseCase';

const balanceRepository = new BalanceRepository(prisma);
const identityRepository = new IdentityRepository(prisma);
const readBalanceUseCase = new ReadIdentityUseCase(identityRepository);

const createBalanceUseCase = new CreateBalanceUseCase(balanceRepository, readBalanceUseCase);

export { createBalanceUseCase };

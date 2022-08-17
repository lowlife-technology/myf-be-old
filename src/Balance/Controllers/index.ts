import { createBalanceUseCase } from '../useCases';
import { CreateBalanceController } from './CreateBalanceController';

const createBalanceController = new CreateBalanceController(createBalanceUseCase);

export { createBalanceController };

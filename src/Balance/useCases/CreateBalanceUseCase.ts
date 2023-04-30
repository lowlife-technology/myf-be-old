import { IBalanceRepository } from '../BalanceRepository';
import { ICreateBalanceDTO } from '../DTOs/CreateBalanceDTO';
import { Balance } from '../BalanceEntity';
import { IReadIdentityUseCase } from '../../Identity/useCases/readIdentityUseCase';

export interface ICreateBalanceUseCase {
  execute(balance: ICreateBalanceDTO, userJWT: string): Promise<Balance>;
}

export class CreateBalanceUseCase implements ICreateBalanceUseCase {
  constructor(
    private balanceRepository: IBalanceRepository,
    private readIdentityUseCase: IReadIdentityUseCase,
  ) {
    this.balanceRepository = balanceRepository;
  }

  async execute(balance: ICreateBalanceDTO, userJWT: string): Promise<Balance> {
    const { id } = await this.readIdentityUseCase.execute(userJWT);

    const createdBalance = this.balanceRepository.createBalance({
      ...balance,
      userId: id!,
    });

    return createdBalance;
  }
}

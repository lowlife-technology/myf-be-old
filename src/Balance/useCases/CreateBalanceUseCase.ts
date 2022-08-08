import { IBalanceRepository } from '../BalanceRepository';
import { ICreateBalanceDTO } from '../DTOs/CreateBalanceDTO';
import { Balance } from '../Entity';

export interface ICreateBalanceUseCase {
  execute(balance: ICreateBalanceDTO, userId: string): Promise<Balance>;
}

export class CreateBalanceUseCase implements ICreateBalanceUseCase {
  balanceRepository: IBalanceRepository;

  constructor(balanceRepository: IBalanceRepository) {
    this.balanceRepository = balanceRepository;
  }

  async execute(balance: ICreateBalanceDTO, userId: string): Promise<Balance> {
    const foundUser = await prisma.identity.findFirst({
      where: {
        bearer: {
          token: authorization,
        },
      },
    });

    const balanceEntity = {
      ...balance,
      userId: '',
      // TODO: check if Date for both cases is in the same format
      eventDate: balance.eventDate ? new Date(balance.eventDate) : new Date(),
    };

    this.balanceRepository.createBalance();
    // TODO: this part will be handled on repository and useCase
    // TODO: this should be handled on useCase or repository
    if (!foundUser) throw new ErrorHandler({ httpCode: 401, message: 'Unauthorized' });

    const { id: userId } = foundUser;

    const eventDateISO = new Date(eventDate!);

    if (eventDate && eventDateISO?.toString() === 'Invalid Date')
      throw new ErrorHandler({
        httpCode: 400,
        message: 'Invalid date format. Expected ISO UTC format.',
      });

    await prisma.balance.create({
      data: {
        amount,
        userId,
        description,
        eventDate: eventDateISO,
        categoryId,
      },
    });

    response.status(200).send();

    return this.balanceRepository.createBalance(balanceEntity);
  }
}

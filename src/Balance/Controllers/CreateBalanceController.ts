import { IPostRequest, IResponse } from '../../providers/express';
import { ICreateBalanceDTO } from '../DTOs/CreateBalanceDTO';
import { ICreateBalanceUseCase } from '../useCases/CreateBalanceUseCase';

export interface ICreateBalanceController {
  handle(request: IPostRequest<ICreateBalanceDTO>, response: IResponse): Promise<IResponse>;
}

export class CreateBalanceController implements ICreateBalanceController {
  private createBalanceUseCase: ICreateBalanceUseCase;

  constructor(createBalanceUseCase: ICreateBalanceUseCase) {
    this.createBalanceUseCase = createBalanceUseCase;
  }

  async handle(request: IPostRequest<ICreateBalanceDTO>, response: IResponse): Promise<IResponse> {
    try {
      const { amount, eventDate, categoryId, description } = request.body;
      const authorization = request.headers.authorization.split(' ')[1];

      if (!amount || !categoryId)
        return response
          .status(400)
          .send({ message: 'Invalid body. Fields amount and categoryId are required.' });

      if (!authorization) return response.status(401).send();

      if (typeof amount !== 'number')
        return response.status(400).send({ message: 'amount must be type of number' });

      const eventDateISO = new Date(eventDate!);

      if (eventDate && eventDateISO?.toString() === 'Invalid Date')
        return response.status(400).send({
          message:
            'Invalid date format. Valid formats are: DD/MM/YYYY | YYYY-MM-DD | DD-MM-YYYY | YYYY-MM-DD',
        });

      if (eventDate && typeof eventDate === 'string' && eventDate === '')
        return response
          .status(400)
          .send({ message: 'However eventDate field is optional, it cannot be empty.' });

      if (description && typeof description !== 'string')
        return response
          .status(400)
          .send({ message: 'However description is optional, it must be type of string.' });

      await this.createBalanceUseCase.execute(
        { ...request.body, eventDate: eventDateISO },
        authorization,
      );

      return response.status(201).send();
    } catch (error) {
      const { message } = error as { message: string };
      return response.status(400).send({ message });
    }
  }
}

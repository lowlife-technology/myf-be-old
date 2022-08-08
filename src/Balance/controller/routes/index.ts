import { Request, Response } from 'express';
import prisma from '../../../../prisma';
import { ErrorHandler } from '../../../utils/ErrorHandler';

export interface ResponseBody {}

export interface RequestBody {
  amount: number;
  description?: string;
  eventDate?: string;
  categoryId: string;
}

export type requestType = Request<any, ResponseBody, RequestBody>;

class Balance {
  static async create(request: requestType, response: Response<ResponseBody>): Promise<void> {
    try {
      const { amount, eventDate, categoryId, description } = request.body;
      const { authorization } = request.headers;

      if (!amount && !categoryId)
        throw new ErrorHandler({
          httpCode: 400,
          message: 'Invalid body. Fields amount and categoryId are required.'
        });

      const foundUser = await prisma.identity.findFirst({
        where: {
          bearer: {
            token: authorization
          }
        }
      });

      if (!authorization || !foundUser)
        throw new ErrorHandler({ httpCode: 401, message: 'Unauthorized' });

      if (typeof amount !== 'number')
        throw new ErrorHandler({ httpCode: 400, message: 'amount must be type of number' });

      const { id: userId } = foundUser;

      if (eventDate === '')
        throw new ErrorHandler({
          httpCode: 400,
          message: 'However eventDate field is optional, it cannot be empty.'
        });

      const eventDateISO = new Date(eventDate!);
      if (eventDate && eventDateISO?.toString() === 'Invalid Date')
        throw new ErrorHandler({
          httpCode: 400,
          message: 'Invalid date format. Expected ISO UTC format.'
        });

      await prisma.balance.create({
        data: {
          amount,
          userId,
          description,
          eventDate: eventDateISO,
          categoryId
        }
      });

      response.status(200).send();
    } catch (error: any) {
      response.status(error.httpCode).send({ message: error.message });
    }
  }
}

export { Balance };

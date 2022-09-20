import { Request, Response } from 'express';
import { prisma } from '../../../../prisma';

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
      const authorization = request.headers.authorization.split(' ')[1];

      if (!amount && !categoryId) {
        response
          .status(400)
          .send({ message: 'Invalid body. Fields amount and categoryId are required.' });
        return;
      }

      const foundUser = await prisma.identity.findFirst({
        where: {
          bearer: {
            token: authorization,
          },
        },
      });

      if (!authorization || !foundUser) {
        response.status(401);
        return;
      }

      if (typeof amount !== 'number') {
        response.status(400).send({ message: 'amount must be type of number' });
      }

      const { id: userId } = foundUser;

      if (eventDate === '') {
        response
          .status(400)
          .send({ message: 'However eventDate field is optional, it cannot be empty.' });
        return;
      }

      const eventDateISO = new Date(eventDate!);
      if (eventDate && eventDateISO?.toString() === 'Invalid Date') {
        response.status(400).send({
          message: 'Invalid date format. Expected ISO UTC format.',
        });

        return;
      }

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
    } catch (error: any) {
      response.status(error.httpCode).send({ message: error.message });
    }
  }
}

export { Balance };

import { Request, Response } from 'express';
import prisma from '../../../../prisma';

export interface ResponseBody {}

export interface RequestBody {
  amount: number;
  description?: string;
  eventDate?: string;
  categoryId: string;
}

export type request = Request<any, ResponseBody, RequestBody>;

class Balance {
  create(request: request, response: Response<ResponseBody>) {
    const { amount, eventDate, categoryId, description } = request.body;
    const { authorization } = request.headers;

    if (!amount && !categoryId)
      throw new Error(`Invalid body. Fields amount and categoryId are required.`);

    // find user through authorization header.
    const userToken = prisma.identity.findUnique({
      where: {
        email: '',
      },
    });

    if (!authorization && authorization !== userToken) throw new Error('Unauthorized');
  }
}

const balance = new Balance();
export { balance };

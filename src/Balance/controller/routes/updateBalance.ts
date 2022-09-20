import { Request, Response } from 'express';
import { prisma } from '../../../../prisma';

export const UpdateBalance = async (request: Request, response: Response) => {
  const authorization = request.headers.authorization.split(' ')[1];
  const { balanceId, amount, categoryId, description, eventDate } = request.body;

  if (!authorization) return response.status(401).send();

  const user = await prisma.identity.findFirst({
    where: {
      bearer: {
        token: authorization,
      },
    },
  });

  if (!user) return response.status(401).send();

  try {
    await prisma.balance.update({
      where: {
        id: balanceId,
      },
      data: {
        amount,
        categoryId,
        updatedAt: new Date(),
        description,
        eventDate: new Date(eventDate),
      },
    });
    return response.status(200).send();
  } catch (error) {
    console.log(error);
    return response.status(500).send(error);
  }
};

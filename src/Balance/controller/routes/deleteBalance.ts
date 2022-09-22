import { Request, Response } from 'express';
import { prisma } from '../../../../prisma';

export const deleteBalance = async (request: Request, response: Response) => {
  const bearerToken = request.headers.authorization.split(' ')[1];
  const requestBalanceId = request.params.id;

  if (!bearerToken) return response.status(401).send();
  if (!requestBalanceId) return response.status(400).send({ message: 'Balance id is required.' });

  const user = await prisma.identity.findFirst({
    where: {
      bearer: {
        token: bearerToken,
      },
    },
  });

  if (!user) return response.status(401).send();

  const dbBalanceId = await prisma.balance.findUnique({
    where: {
      id: requestBalanceId,
    },
  });

  if (!dbBalanceId)
    return response.status(400).send({
      message: `Balance id with provided id does not exist. Provided id: ${requestBalanceId}`,
    });

  try {
    await prisma.identity.update({
      where: {
        id: user.id,
      },
      data: {
        balances: {
          update: {
            where: {
              id: requestBalanceId,
            },
            data: {
              deletedAt: new Date(),
            },
          },
        },
      },
    });

    return response.status(200).send();
  } catch (error) {
    return response.status(500).send({
      message: error,
    });
  }
};

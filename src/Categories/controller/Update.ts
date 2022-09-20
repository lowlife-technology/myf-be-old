import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface UpdateCategoryParams {
  id: string;
}

interface UpdateCategoryBody {
  name: string;
  projectedAmount: number;
  description: string;
  balanceType: 'INCOME' | 'EXPENSE';
}

const prisma = new PrismaClient();

type UpdateCategoryRequest = Request<UpdateCategoryParams, any, UpdateCategoryBody>;

export default async (req: UpdateCategoryRequest, res: Response) => {
  const {
    params: { id },
    body: { name, projectedAmount, description, balanceType },
    headers,
  } = req;

  const authorization = headers.authorization.split(' ')[1];

  if (!authorization) return res.status(401).send({ message: 'unauthorized' });

  if (!name || !balanceType || !projectedAmount || !description) {
    return res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
  }

  if (
    typeof name !== 'string' ||
    typeof balanceType !== 'string' ||
    typeof projectedAmount !== 'number' ||
    typeof description !== 'string'
  ) {
    return res.status(400).send({
      message: 'Field wrong value type',
      status: 'error',
    });
  }

  if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
    return res.status(400).send({
      message: `${balanceType} is not assinged to type : INCOME | EXPENSE`,
      status: 'error',
    });
  }

  if (!id) {
    return res.status(400).send({
      message: 'Missing required id',
      status: 'error',
    });
  }

  try {
    const user = await prisma.identity.findFirst({
      where: {
        bearer: {
          token: authorization,
        },
      },
    });

    await prisma.identity.update({
      where: {
        id: user.id,
      },
      data: {
        categories: {
          update: {
            where: {
              id,
            },
            data: {
              name,
              projectedAmount,
              description,
              balanceType,
            },
          },
        },
      },
    });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({
      message: error,
      status: 'error',
    });
  }
};

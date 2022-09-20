import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface CreateCategoryResposeBody {
  name: string;
  projectedAmount?: number;
  description?: string;
  autoInsert: boolean;
  balanceType: 'INCOME' | 'EXPENSE';
}

const prisma = new PrismaClient();

export default async (req: Request<any, any, CreateCategoryResposeBody>, res: Response) => {
  const { name, projectedAmount, autoInsert, description, balanceType } = req.body;
  const authorization = req.headers.authorization.split(' ')[1];

  if (!authorization) return res.status(401).send();

  if (!name || !balanceType) {
    return res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
  }

  if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
    return res.status(400).send({
      message: 'Invalid type',
      status: 'error',
    });
  }

  // todo: make a better logic to validate it.
  if (
    typeof autoInsert !== 'boolean' ||
    typeof projectedAmount !== 'number' ||
    typeof description !== 'string'
  ) {
    return res.status(400).send({
      message: 'Invalid autoInsert, projectedAmount or description data type',
      status: 'error',
    });
  }

  try {
    const foundUser = await prisma.identity.findFirst({
      where: {
        bearer: {
          token: authorization,
        },
      },
    });

    if (!foundUser?.id) throw new Error('Unauthorized!');

    const isValidName = await prisma.category.findFirst({
      where: {
        name,
        identity: {
          id: foundUser.id,
        },
      },
    });

    if (isValidName) {
      return res.status(400).send({
        message: 'Category already exist',
        status: 'error',
      });
    }

    const category = await prisma.category.create({
      data: {
        userId: foundUser.id,
        name,
        projectedAmount,
        autoInsert,
        description,
        balanceType,
      },
    });

    if (!category) {
      return res.status(500).send({
        message: "Couldn't create category.",
        status: 'error',
      });
    }

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send({
      message: error,
      status: 'error',
    });
  }
};

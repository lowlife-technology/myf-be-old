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
  const { authorization } = req.headers;

  if (!name || !balanceType) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });

    return;
  }

  if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
    res.status(400).send({
      message: 'Invalid type',
      status: 'error',
    });

    return;
  }

  // todo: make a better logic to validate it.
  if (
    typeof autoInsert !== 'boolean' ||
    typeof projectedAmount !== 'number' ||
    typeof description !== 'string'
  ) {
    res.status(400).send({
      message: 'Invalid value',
      status: 'error',
    });

    return;
  }

  try {
    const isValidName = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    if (isValidName) {
      res.status(400).send({
        message: 'Category already exists',
        status: 'error',
      });

      return;
    }

    const foundUser = await prisma.identity.findFirst({
      where: {
        bearer: {
          token: authorization,
        },
      },
    });

    if (!foundUser?.id) throw new Error('Unauthorized!');

    // TODO: check if name already exist.
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
      res.status(500).send({
        message: "Couldn't create category.",
        status: 'error',
      });

      return;
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error',
    });
  }
};

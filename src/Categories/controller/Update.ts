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
    body: {
      name, projectedAmount, description, balanceType,
    },
  } = req;

  console.log(id);

  if (!name || !balanceType || !projectedAmount || !description) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });

    return;
  }

  if (
    typeof name !== 'string'
    || typeof balanceType !== 'string'
    || typeof projectedAmount !== 'number'
    || typeof description !== 'string') {
    res.status(400).send({
      message: 'Field wrong value type',
      status: 'error',
    });
  }

  if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
    res.status(400).send({
      message: `${balanceType} is not assinged to type : INCOME | EXPENSE`,
      status: 'error',
    });
  }

  if (!id) {
    res.status(400).send({
      message: 'Missing required id',
      status: 'error',
    });
    return;
  }

  try {
    const upDateCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        projectedAmount,
        description,
        balanceType,
      },
    });
    if (upDateCategory) {
      res.status(200).send();
      return;
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error',
    });
  }
};

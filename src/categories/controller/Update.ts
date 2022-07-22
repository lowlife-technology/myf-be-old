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

export default () => async (req: UpdateCategoryRequest, res: Response) => {
  const {
    params: { id },
    body: {
      name, projectedAmount, description, balanceType,
    },
  } = req;

  if (!name || !balanceType || !projectedAmount || !description) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });

    return;
  }

  if (!id) {
    res.status(400).send({
      message: 'Missing required uuid',
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
      res.status(200).send(upDateCategory);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error',
    });
  }
};

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface CreateCategoryResposeBody{
  name: string;
  projectedAmount?: number;
  description?: string;
  autoInsert: boolean;
  balanceType: 'INCOME' | 'EXPENSE';
}

const prisma = new PrismaClient();

export default async (req: Request<any, any, CreateCategoryResposeBody>, res: Response) => {
  const {
    name, projectedAmount, autoInsert, description, balanceType,
  } = req.body;

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

  try {
    const category = await prisma.category.create({
      data: {
        name,
        projectedAmount,
        autoInsert,
        description,
        balanceType,
      },
    });

    if (category) {
      res.status(201);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error',
    });
  }
};

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface ListCategoryParams {
  balanceType: 'INCOME' | 'EXPENSE';
}

const prisma = new PrismaClient();

export default async (req: Request<any, any, any, ListCategoryParams>, res: Response) => {
  const { balanceType } = req.query;

  if (!balanceType) {
    try {
      const categories = await prisma.category.findMany();

      if (categories.length === 0) {
        res.status(400).send({
          message: 'Category not found',
          status: 'error'
        });

        return;
      }

      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({
        message: 'Internal server error',
        status: 'error'
      });
    }

    return;
  }

  const [firstQueryKey] = Object.keys(req.query);

  if (firstQueryKey !== 'balanceType') {
    res.status(400).send({
      message: `${firstQueryKey} is not a valid key. Valid key is balanceType`,
      status: 'error'
    });

    return;
  }

  if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
    res.status(400).send({
      message: `Invalid query param ${balanceType} provided. Valid params are: INCOME or EXPENSE`,
      status: 'error'
    });

    return;
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        balanceType
      }
    });

    if (categories.length === 0) {
      res.status(400).send({
        message: `Category with balanceType ${balanceType} was not found`,
        status: 'error'
      });

      return;
    }

    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error'
    });
  }
};

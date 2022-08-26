import { Request, Response } from 'express';
import { prisma } from '../../../prisma';

interface ListCategoryParams {
  balanceType: 'INCOME' | 'EXPENSE';
}

export default async (req: Request<any, any, any, ListCategoryParams>, res: Response) => {
  const { balanceType } = req.query;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      message: 'unauthorized',
    });
  }

  const user = await prisma.bearer.findFirst({
    where: {
      token: authorization,
    },
    include: {
      identity: true,
    },
  });

  if (!user) {
    return res.status(401).send({
      message: 'unauthorized',
    });
  }

  if (!balanceType) {
    try {
      const categories = await prisma.category.findMany({
        where: {
          userId: user.userId,
        },
      });

      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send({
        message: 'Internal server error',
        status: 'error',
      });
    }
  }

  const [firstQueryKey] = Object.keys(req.query);

  if (firstQueryKey !== 'balanceType') {
    return res.status(400).send({
      message: `${firstQueryKey} is not a valid key. Valid key is balanceType`,
      status: 'error',
    });
  }

  if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
    return res.status(400).send({
      message: `Invalid query param ${balanceType} provided. Valid params are: INCOME or EXPENSE`,
      status: 'error',
    });
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        balanceType,
        userId: user.userId,
      },
    });

    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({
      message: error,
      status: 'error',
    });
  }
};

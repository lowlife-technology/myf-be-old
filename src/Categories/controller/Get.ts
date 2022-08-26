import { Request, Response } from 'express';
import { prisma } from '../../../prisma';

interface getCategoryByIdParams {
  id: string;
}

export default async (req: Request<getCategoryByIdParams>, res: Response) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({
      message: 'unauthorized',
    });
  }

  if (!id) {
    return res.status(400).send({
      message: 'Missing required id',
      status: 'error',
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

  if (!user.userId) {
    return res.status(401).send({
      message: 'unauthorized',
    });
  }

  try {
    const getSingleCategory = await prisma.category.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!getSingleCategory) {
      return res.status(400).send({
        message: 'Category not found',
        status: 'error',
      });
    }

    return res.status(200).send(getSingleCategory);
  } catch (error) {
    return res.status(500).send({
      message: error,
      status: 'error',
    });
  }
};

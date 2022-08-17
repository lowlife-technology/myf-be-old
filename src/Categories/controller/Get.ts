import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface getCategoryByIdParams {
  id: string;
}

const prisma = new PrismaClient();

export default async (req: Request<getCategoryByIdParams>, res: Response) => {
  const { id } = req.params;

  console.log('get', req);

  if (!id) {
    res.status(400).send({
      message: 'Missing required id',
      status: 'error',
    });

    return;
  }

  try {
    const getSingleCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!getSingleCategory) {
      res.status(400).send({
        message: 'Category not found',
        status: 'error',
      });

      return;
    }

    res.status(200).send(getSingleCategory);
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error',
    });
  }
};

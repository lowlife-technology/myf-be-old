import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface DeleteCategoryRespose {
    id: string;
}

const prisma = new PrismaClient();

export default async (req: Request<any, any, DeleteCategoryRespose>, res: Response) => {
  if (!req.body.id) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
  }

  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        id: req.body.id,
      },
    });

    if (deleteCategory) {
      res.status(201);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error',
    });
  }

  res.status(200);
};

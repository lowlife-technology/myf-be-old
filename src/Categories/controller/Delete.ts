import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface DeleteCategoryRespose {
    id: string;
}

const prisma = new PrismaClient();

export default async (req: Request<any, any, DeleteCategoryRespose>, res: Response) => {
  const { id } = req.params;

  const isIdValid = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (isIdValid === null) {
    res.status(400).send({
      message: 'Category not founded | deleted | empyt field',
      status: 'error',
    });
    return;
  }

  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    if (deleteCategory) {
      res.status(201).send({
        message: 'Category deleted',
        status: 'success',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      status: 'error',
    });
  }

  res.status(200);
};

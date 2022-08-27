import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

interface DeleteCategoryRespose {
  id: string;
}

const prisma = new PrismaClient();

export default async (req: Request<any, any, DeleteCategoryRespose>, res: Response) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'unauthorized' });
  if (!id) return res.status(400).send({ message: 'please, provide a valid id on url param.' });

  const user = await prisma.bearer.findFirst({
    where: {
      token: authorization,
    },
    include: {
      identity: true,
    },
  });

  const isIdValid = await prisma.category.findFirst({
    where: {
      id,
      userId: user.identity.id,
    },
  });

  if (isIdValid === null) {
    return res.status(400).send({
      message: "Could'nt delete category as it was not found.",
      status: 'error',
    });
  }

  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({
      message: error,
      status: 'error',
    });
  }
};

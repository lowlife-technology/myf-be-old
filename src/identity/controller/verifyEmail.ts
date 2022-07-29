import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const prisma = new PrismaClient();

const router = express.Router();

router.post('/identity/verifyEmail', async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).send({
      message: 'No token provided',
      status: 'erro'
    });
  }

  try {
    const foundToken = await prisma.token.findUnique({
      where: {
        token
      }
    });
    if (foundToken?.token !== token) {
      res.status(400).send({
        message: 'Invalid token',
        status: 'erro'
      });
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).send({
      message: 'internal error',
      status: 'error'
    });
  }
});

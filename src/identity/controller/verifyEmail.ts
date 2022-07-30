import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const router = express.Router();

router.patch('/identity/verifyEmail', async (req, res) => {
  const token = Number(req.query?.token);

  if (Number.isNaN(token) || token === 0) {
    res.status(400).send({
      message: 'Token is required',
      status: 'error'
    });
  }

  try {
    const findToken = await prisma.token.findUnique({
      where: {
        token
      }
    });

    if (findToken?.status === 'active') {
      res.status(400).send({
        message: 'Token is already verified',
        status: 'error'
      });
    }

    if (findToken?.token !== token) {
      res.status(400).send({
        message: 'Invalid token',
        status: 'error'
      });
      return;
    }

    const endTime: any = findToken?.expireAt.getTime();
    const now = new Date();
    const currentTime = now.getTime();

    console.log(endTime, currentTime);

    if (currentTime > endTime) {
      res.status(400).send({
        mesasge: 'Token has expired',
        status: 'error'
      });
      return;
    }

    await prisma.token.update({
      where: {
        token
      },
      data: {
        status: 'active'
      }
    });

    res.status(200).send();
  } catch (error) {
    res.status(500).send({
      message: 'internal error',
      status: 'error'
    });
  }
});

export default router;

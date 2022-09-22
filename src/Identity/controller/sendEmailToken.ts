import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import sendingEmail from '../services/sendingEmail';
// import sendingEmail from '../services/sendingEmail';

const prisma = new PrismaClient();

const router = express.Router();

export interface SendEmailTokenRequestBody {
  email: string;
}

router.post(
  '/identity/sendEmailToken',
  async (req: Request<any, any, SendEmailTokenRequestBody>, res: Response) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).send({
        message: 'No email provided',
        status: 'error',
      });

      return;
    }

    try {
      const token = Math.floor(Math.random() * 10000);
      const expireAt = new Date();
      const minuteInEpoch = 1 * 60 * 1000;
      expireAt.setTime(expireAt.getTime() + minuteInEpoch);

      const foundUser = await prisma.identity.findUnique({
        where: {
          email,
        },
        select: {
          token: {
            select: {
              status: true,
            },
          },
        },
      });

      if (foundUser?.token?.status === 'active') {
        res.status(400).send({
          message: 'Token is already verified',
          status: 'error',
        });
      }

      if (!foundUser) {
        res.status(400).send({
          message: 'Wrong email provided.',
          status: 'error',
        });

        return;
      }

      await prisma.identity.update({
        where: { email },
        data: {
          token: {
            update: {
              expireAt,
              token,
            },
          },
        },
      });

      // TODO: add type to sendEmailResponse
      const sendEmailResponse = (await sendingEmail(
        req.body.email,
        `Your token is ${token}`,
        'Is that yours ?',
      )) as any;

      if (sendEmailResponse?.code) {
        // TODO: treat error message
        res.status(400).send({
          message: sendEmailResponse.message,
          status: 'error',
        });

        return;
      }

      res.status(200).send();
    } catch (error) {
      // console.log(error);

      res.status(500).send({
        message: 'internal error',
        status: 'error',
      });
    }
  },
);

export default router;

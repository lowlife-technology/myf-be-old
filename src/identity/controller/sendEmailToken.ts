// import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
// import sendingEmail from '../services/sendingEmail';

// const prisma = new PrismaClient();

const router = express.Router();

export interface SendEmailTokenRequestBody {
  email: string;
}

router.post(
  '/identity/sendEmailToken',
  async (req: Request<any, any, SendEmailTokenRequestBody>, res: Response) => {
    const { email } = req.body;
    // const foundUser = await prisma.token.findUnique({
    //   where: {
    //     // email
    //   }
    // });

    if (!email) {
      res.status(400).send({
        message: 'No email provided',
        status: 'error'
      });
      return;
    }

    try {
      // if (foundUser?.email === email) {
      //   await prisma.token.update({
      //     where: {
      //       email
      //     },
      //     data: {
      //       email,
      //       token
      //     }
      //   });
      //   return;
      // }

      res.status(200).send({
        message: 'Email sent',
        status: 'success'
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: 'internal error',
        status: 'error'
      });
    }
  }
);

export default router;

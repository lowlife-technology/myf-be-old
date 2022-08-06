import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import sendingEmail from '../services/sendingEmail';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export interface RegisterResponseBody {
  fullName: string;
  email: string;
  password: string;
}

const router = express.Router();
const mockedCategories = (userId: string) => [
  {
    userId,
    name: 'Main Job',
    projectedAmount: 1212.0,
    description: 'My Monthly salary.',
    balanceType: 'INCOME',
  },
  {
    userId,
    name: 'Home Rent',
    projectedAmount: 650.0,
    description: 'Monthly Home Rent.',
    balanceType: 'EXPENSE',
  },
];

// todo: create a type interface for res
router.post(
  '/identity/register',
  async (req: Request<any, any, RegisterResponseBody>, res: Response) => {
    // todo: create validations
    const token = Math.floor(Math.random() * 10000);

    if (!req.body.email || !req.body.password || !req.body.fullName) {
      res.status(400).send({
        message: 'Missing required fields',
        status: 'error',
      });
      return;
    }
    const numberOfRounds = 10;

    bcrypt.hash(req.body.password, numberOfRounds, async (err, hash) => {
      try {
        const foundUser = await prisma.identity.findUnique({
          where: {
            email: req.body.email,
          },
        });

        if (foundUser?.email !== req.body.email) {
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

          const expireAt = new Date();
          const minuteInEpoch = 1 * 60 * 1000;
          expireAt.setTime(expireAt.getTime() + minuteInEpoch);
          const bearerToken = jwt.sign({ email: req.body.email }, 'qualquer');

          const createdUser = await prisma.identity.create({
            data: {
              password: hash,
              email: req.body.email,
              fullName: req.body.fullName,
              bearer: {
                create: {
                  token: bearerToken,
                },
              },
              token: {
                create: {
                  expireAt,
                  token,
                  status: 'inactive',
                },
              },
            },
          });

          await prisma.category.createMany({
            skipDuplicates: true,
            data: mockedCategories(createdUser.id),
          });

          res.status(200).send();

          return;
        }

        res.status(400).send({ message: 'User allready existe' });
      } catch (error) {
        console.log(error);

        res.status(500).send({
          message: 'internal error',
          status: 'error',
        });
      }
    });
  },
);

export default router;

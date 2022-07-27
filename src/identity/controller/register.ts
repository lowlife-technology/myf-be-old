import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export interface RegisterResponseBody {
  fullName: string;
  email: string;
  password: string;
}

const router = express.Router();

// todo: create a type interface for res
router.post(
  '/identity/register',
  async (req: Request<any, any, RegisterResponseBody>, res: Response) => {
    // todo: create validations
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
          await prisma.identity.create({
            data: {
              password: hash,
              email: req.body.email,
              fullName: req.body.fullName,
            },
          });

          res.status(200).send();

          return;
        }

        res.status(400).send({ message: 'User allready existe' });
      } catch (error) {
        res.status(500).send({
          message: 'internal error',
          status: 'error',
        });
      }
    });
  },
);

export default router;

import express, { Request } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export interface CreateResponseBody {
  fullName: string;
  email: string;
  password: string;
}

const router = express.Router();

// todo: create a type interface for res
router.post('/identity/register', async (req: Request<any, any, CreateResponseBody>, res) => {
  // todo: create validations
  if (!req.body.email || !req.body.password || !req.body.fullName) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error'
    });
    return;
  }

  const numberOfRounds = 10;

  bcrypt.hash(req.body.password, numberOfRounds, async (err, hash) => {
    try {
      const check = await prisma.identity.findUnique({
        where: {
          email: req.body.email
        }
      });
      if (check?.email !== req.body.email) {
        const response = await prisma.identity.create({
          data: {
            password: hash,
            email: req.body.email,
            fullName: req.body.fullName
          }
        });
        res.status(200).send({ message: 'User created', status: 'success' });
      } else {
        res.status(400).send({ message: 'User allready existe' });
      }
    } catch (error) {
      console.log(error);
    }
  });
});

export default router;

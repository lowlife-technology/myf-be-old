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
router.post('/identity/register', (req: Request<any, any, CreateResponseBody>, res) => {
  // todo: create validations
  if (!req.body.email || !req.body.password || !req.body.fullName) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
    return;
  }

  // todo: change this to postgress when its configured.

  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    try {
      const response = await prisma.identity.create({
        data: {
          password: hash,
          email: req.body.email,
          fullName: req.body.fullName,
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  res.status(200);
});

export default router;

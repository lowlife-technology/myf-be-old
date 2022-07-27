import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  status: string;
  data?: {
    token: string;
  };
}

router.post(
  '/identity/login',
  async (req: Request<any, LoginResponse, LoginRequest>, res: Response<LoginResponse>) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({
        message: 'Missing required fields',
        status: 'error',
      });

      return;
    }

    try {
      const foundUser = await prisma.identity.findUnique({
        where: { email },
      });

      if (foundUser) {
        const validPassword = await bcrypt.compare(password, foundUser.password);

        if (validPassword) {
          // todo: generate a token that expires!
          const token = jwt.sign({ email }, 'qualquer');

          res.status(201).send({
            message: 'user logged in',
            status: 'success',
            data: {
              token: `Bearer ${token}`,
            },
          });

          return;
        }

        res.status(400).send({
          message: 'wrong email or password',
          status: 'error',
        });
      }
    } catch (error) {
      res.status(500).send({
        message: 'internal error',
        status: 'error',
      });
    }
  },
);

export default router;

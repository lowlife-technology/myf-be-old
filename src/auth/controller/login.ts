import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tempDatabase from '../../../temp-database.json';

const router = express.Router();

interface LoginResponseBody {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  status: string;
  data?: {
    token: string;
  }

}

router.post('/login', async (req :Request<any, any, LoginResponseBody >, res: Response<LoginResponse>) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });

    return;
  }

  const foundUser = tempDatabase.find((user) => email === user.email);

  if (!foundUser) {
    res.status(404).send({
      message: 'User not found',
      status: 'error',
    });

    return;
  }

  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (!validPassword) {
    res.status(404).send({
      message: 'User not found',
      status: 'error',
    });

    return;
  }

  // todo: generate a token that expires!
  const token = jwt.sign({ email }, 'qualquer');

  res.status(201).send({
    message: '',
    status: 'success',
    data: {
      token: `Bearer ${token}`,
    },
  });
});

export default router;

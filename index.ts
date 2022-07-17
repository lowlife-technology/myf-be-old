import express, { Request } from 'express';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import tempDatabase from './temp-database.json';

const app = express();
app.use(express.json());

export interface CreateResponseBody {
  username: string;
  email: string;
  password: string;
}

app.post('/login', async (req, res) => {
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

app.post('/create', (req: Request<any, any, CreateResponseBody>, res) => {
  // todo: create validations
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
  }

  // todo: change this to postgress when its configured.
  const tempDB: CreateResponseBody[] = [...tempDatabase];

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (!err) {
      tempDB.push({
        ...req.body,
        password: hash,
      });

      fs.writeFileSync('temp-database.json', JSON.stringify(tempDB));
    }
  });

  res.status(200).json({
    message: 'ok',
    status: 'success',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

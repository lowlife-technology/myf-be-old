import express, { Request } from 'express';
import fs from 'fs';
import bcrypt from 'bcrypt';
import tempDatabase from './temp-database.json';

const app = express();
app.use(express.json());

export interface CreateResponseBody {
  username: string;
  email: string;
  password: string;
}

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

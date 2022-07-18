import express, { Request } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import tempDatabase from '../../../temp-database.json';

export interface CreateResponseBody {
  username: string;
  email: string;
  password: string;
}

const router = express.Router();

// todo: create a type interface for res
router.post('/create', (req: Request<any, any, CreateResponseBody>, res) => {
  // todo: create validations
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
    return;
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

export default router;

import express, { Request } from 'express';

const router = express.Router();

interface getCategoryByIdParams {
  id: number;
}

router.get('/:id', (req: Request<getCategoryByIdParams>, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: 'Missing required uuid',
      status: 'error',
    });

    return;
  }

  // todo: query category by id from database.

  res.status(200).send({
    message: '',
    status: 'success',
    data: 'todo: category object data',

  });
});

import express, { Request } from 'express';

const router = express.Router();

interface ListCategoryParams {
  type: 'INCOME' | 'EXPENSE'
}

router.get('/:id', (req: Request<ListCategoryParams>, res) => {
  const { type } = req.params;

  if (!type) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });

    // todo: query category on database.

    res.status(200).send({
      message: '',
      status: 'success',
      data: 'todo: category object data',
    });
  }
});

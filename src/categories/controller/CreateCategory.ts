import express, { Request } from 'express';

const router = express.Router();

interface CreateCategoryResposeBody{
  categoryName: string;
  currentDate?: Date;
  avaregeAmount?: number;
  fixedAmount?: number;
  description?: string;
  type: 'INCOME' | 'EXPENSE';
}

router.post('/category', (req: Request<any, any, CreateCategoryResposeBody>, res) => {
  const {
    categoryName, currentDate, avaregeAmount, fixedAmount, description, type,
  } = req.body;

  if (!categoryName || !type) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });

    return;
  }

  if (type !== 'INCOME' && type !== 'EXPENSE') {
    res.status(400).send({
      message: 'Invalid type',
      status: 'error',
    });

    return;
  }

  // TODO: a push to the database
  // TODO: await the response
  // create an id or let prisma do it

  res.status(201);
});

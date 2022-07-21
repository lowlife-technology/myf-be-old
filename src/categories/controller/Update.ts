import { Request, Response } from 'express';

interface UpdateCategoryParams {
  id: number;
}

interface UpdateCategoryBody {
  categoryName: string;
  currentDate: Date;
  avaregeAmount: number;
  fixedAmount: number;
  description: string;
  type: 'INCOME' | 'EXPENSE';
}

type UpdateCategoryRequest = Request<UpdateCategoryParams, any, UpdateCategoryBody>;

export default () => (req: UpdateCategoryRequest, res: Response) => {
  const {
    params: { id },
    body: {
      categoryName, currentDate, avaregeAmount, fixedAmount, description, type,
    },
  } = req;

  if (!categoryName || !type || !currentDate || !avaregeAmount || !fixedAmount || !description) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });

    return;
  }

  if (!id) {
    res.status(400).send({
      message: 'Missing required uuid',
      status: 'error',
    });
    return;
  }

  // todo: update category by id from database.

  res.status(200);
};

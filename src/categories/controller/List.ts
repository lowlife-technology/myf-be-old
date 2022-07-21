import { Request, Response } from 'express';

interface ListCategoryParams {
  type: 'INCOME' | 'EXPENSE'
}

export default () => (req: Request<ListCategoryParams>, res: Response) => {
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
};

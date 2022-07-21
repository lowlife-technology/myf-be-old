import { Request, Response } from 'express';

interface DeleteCategoryRespose {
    id: number;
 }

export default (req: Request<any, any, DeleteCategoryRespose>, res: Response) => {
  if (!req.body.id) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
  }

  // todo: delete category by id.
  // SOFT-DELETE

  res.status(200);
};

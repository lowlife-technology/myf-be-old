import { Request, Response } from 'express';

interface getCategoryByIdParams {
  id: number;
}

export default (req: Request<getCategoryByIdParams>, res: Response) => {
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
};

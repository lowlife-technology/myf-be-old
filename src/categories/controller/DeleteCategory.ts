import express, { Request } from 'express';

const router = express.Router();

interface DeleteCategoryRespose {
    id: number;
 }

router.delete('/category/:id', (req: Request<any, any, DeleteCategoryRespose>, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
  }

  // todo: delete category by id.
  // SOFT-DELETE

  res.status(200);
});

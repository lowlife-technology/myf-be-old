import express, { Request } from 'express';

const router = express.Router();

export interface CreateResponseBody {
  categoryName: string;
  currentDate?: string;
  avaregeAmount?: number;
  fixedAmount?: number;
  description?: string;

}

router.post('/categories/manager', (req: Request<any, any, CreateResponseBody>, res) => {
  if (!req.body.categoryName) {
    res.status(400).send({
      message: 'Missing required fields',
      status: 'error',
    });
  }
});

export default router;

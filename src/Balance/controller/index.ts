import Express from 'express';
import { balance } from './routes';

const router = Express.Router();

router.post('/balance', balance.create);

export default router;

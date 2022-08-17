import Express from 'express';
import { Balance } from './routes';

const router = Express.Router();

router.post('/balance', Balance.create);

export default router;

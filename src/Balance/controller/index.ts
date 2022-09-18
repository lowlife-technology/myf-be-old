import Express from 'express';
import { Balance } from './routes/createBalance';

const router = Express.Router();

router.post('/balance', Balance.create);
// router.get('/balance');
export default router;

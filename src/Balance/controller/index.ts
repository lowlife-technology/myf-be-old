import Express from 'express';
// import { Balance } from './routes/createBalance';
import { deleteBalance } from './routes/deleteBalance';
import { listBalance } from './routes/listBalance';
import { UpdateBalance } from './routes/updateBalance';

const router = Express.Router();

// router.post('/balance', Balance.create);
router.get('/balance', listBalance);
router.delete('/balance/:id', deleteBalance);
router.put('/balance', UpdateBalance);

export default router;

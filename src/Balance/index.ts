import express from 'express';
import { createBalanceController } from './Controllers';

const balanceRouter = express.Router();

balanceRouter.post('/balance', createBalanceController.handle);

export { balanceRouter };

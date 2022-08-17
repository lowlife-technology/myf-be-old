import express from 'express';
import { IPostRequest } from '../providers/express';
import { createBalanceController } from './Controllers';
import { ICreateBalanceDTO } from './DTOs/CreateBalanceDTO';

const balanceRouter = express.Router();

balanceRouter.post('/balance', (request: IPostRequest<ICreateBalanceDTO>, response) =>
  createBalanceController.handle(request, response),
);

export { balanceRouter };

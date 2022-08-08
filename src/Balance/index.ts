import express from 'express';
import prisma from '../../prisma';
import { AuthMiddleware } from '../providers/express/Middlewares/authMiddleware';
import { createBalanceController } from './Controllers';

const balanceRouter = express.Router();

// TODO: I think this breaks clean architecure rules. This should be handled differently
// TOOD: this prisma.bearer will be replaced by the identity repository when implemented

const authenticationMiddleware = new AuthMiddleware(prisma.bearer);

balanceRouter.post('/balance', [authenticationMiddleware, createBalanceController.handle]);

export { balanceRouter };

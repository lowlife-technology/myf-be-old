import { Router } from 'express';
import { CreateIdentityUseCase } from './domain/useCases/CreateEntityUseCase';
import { IdentityRepository } from './dataAccess/IdentityRepository';
import { CreateIdentityController } from './adapters/CreateIdentityController';

const identityRouter = Router();

const createIdentityUseCase = new CreateIdentityUseCase(IdentityRepository);

const createIdentityController = new CreateIdentityController(createIdentityUseCase);

identityRouter.post('/identity', (req, res) => createIdentityController.handle(req, res));

export { identityRouter };

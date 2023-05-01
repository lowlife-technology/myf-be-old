import { Request, Router } from 'express';
import { CreateIdentityUseCase } from './domain/useCases/CreateEntityUseCase';
import { IdentityRepository } from './dataAccess/IdentityRepository';
import { CreateIdentityController } from './adapters/CreateIdentityController';
import { VerifyCredentialsUseCase } from './domain/useCases/VerifyCredentialsUseCase';
import { VerifyCredentialsController } from './adapters/VerifyCredentialsController';
import { IVerifyCredentialsDTO } from './domain/DTOs/VerifyCredentialsDTO';

const identityRouter = Router();

const createIdentityUseCase = new CreateIdentityUseCase(IdentityRepository);
const createIdentityController = new CreateIdentityController(createIdentityUseCase);

const verifyCredentialsUseCase = new VerifyCredentialsUseCase(IdentityRepository);
const verifyCredentialsController = new VerifyCredentialsController(verifyCredentialsUseCase);

identityRouter.post('/identity', (req, res) => createIdentityController.handle(req, res));
identityRouter.get(
  '/identity/verify',
  (req: Request<unknown, unknown, unknown, IVerifyCredentialsDTO>, res) =>
    verifyCredentialsController.handle(req, res),
);

export { identityRouter };

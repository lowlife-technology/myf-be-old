import { Request, Response, Router } from 'express';

import { CreateIdentityUseCase } from './domain/useCases/CreateIdentityUseCase';
import { IdentityRepository } from './dataAccess/IdentityRepository';
import { CreateIdentityController } from './adapters/CreateIdentityController';
import { GenerateCredentialsUseCase } from './domain/useCases/CredentialsToken/GenerateCredentialsUseCase';
import { GenerateCredentialsController } from './adapters/CredentialsToken/GenerateCredentialsController';
import { IGenerateCredentialsTokenDTO } from './domain/DTOs/CredentialsTokenDTOs/GenerateCredentialsTokenDTO';
import { CredentialsTokenRepository } from './dataAccess/CredentialsTokenRepository';
import { IVerifyCredentialsTokenDTO } from './domain/DTOs/CredentialsTokenDTOs/VerifyCredentialsTokenDTO';
import { VerifyCredentialsTokenController } from './adapters/CredentialsToken/VerifyCredentialsTokenController';
import { VerifyCredentialsTokenUseCase } from './domain/useCases/CredentialsToken/VerifyCredentialsTokenUseCase';
import { JWTRepository } from './dataAccess/JWTRepository';
import { JWTProvider } from '../providers/JWTProvider';
import { ILoginDTO } from './domain/DTOs/IdentityDTOs/LoginDTO';
import { LoginUseCase } from './domain/useCases/LoginUseCase';
import { LoginController } from './adapters/LoginController';
import { GenerateMyfKeyController } from './adapters/MyfKeyControllers/GenerateMyfKeyController';
import { GenerateMyfKeyUseCase } from './domain/useCases/MyfKeyUseCases/GenerateMyfKeyUseCase';
import { MyfKeyRepository } from './dataAccess/MyfKeyRepository';
import { IVerifyMyfKeyDTO } from './domain/DTOs/MyfKeyDTOs/VerifyMyfKeyDTO';
import { VerifyMyfKeyController } from './adapters/MyfKeyControllers/VerifyMyfKeyController';
import { VerifyMyfKeyUseCase } from './domain/useCases/MyfKeyUseCases/VerifyMyfKeyUseCase';

const identityRouter = Router();

const jwtProvider = new JWTProvider();

const createIdentityUseCase = new CreateIdentityUseCase(
  IdentityRepository,
  CredentialsTokenRepository,
  jwtProvider,
  JWTRepository,
);
const createIdentityController = new CreateIdentityController(createIdentityUseCase);

const generateCredentialsUseCase = new GenerateCredentialsUseCase(
  IdentityRepository,
  CredentialsTokenRepository,
);
const verifyCredentialsUseCase = new VerifyCredentialsTokenUseCase(CredentialsTokenRepository);
const loginUseCase = new LoginUseCase(IdentityRepository, jwtProvider, JWTRepository);
const generateMyfKeyUseCase = new GenerateMyfKeyUseCase(MyfKeyRepository);
const verifyMyfKeyUseCase = new VerifyMyfKeyUseCase(MyfKeyRepository, JWTRepository, jwtProvider);

const generateCredentialsController = new GenerateCredentialsController(generateCredentialsUseCase);
const verifyCredentialsTokenController = new VerifyCredentialsTokenController(
  verifyCredentialsUseCase,
);
const loginController = new LoginController(loginUseCase);
const generateMyfKeyController = new GenerateMyfKeyController(generateMyfKeyUseCase);
const verifyMyfKeyController = new VerifyMyfKeyController(verifyMyfKeyUseCase);

identityRouter.post('/identity', (req, res) => createIdentityController.handle(req, res));

identityRouter.post(
  '/identity/generate-credentials-token',
  // DEBT: this will be a post, so instead of query, we'll use body
  (req: Request<unknown, unknown, unknown, IGenerateCredentialsTokenDTO>, res) =>
    generateCredentialsController.handle(req, res),
);

identityRouter.get(
  '/identity/verify-credentials-token',
  (req: Request<unknown, unknown, unknown, IVerifyCredentialsTokenDTO>, res) =>
    verifyCredentialsTokenController.handle(req, res),
);

identityRouter.post('/identity/login', (req: Request<unknown, unknown, ILoginDTO>, res) =>
  loginController.handle(req, res),
);

/**
 * generate myf key to be used as "creating a new account"
 */
identityRouter.post('/identity/myf-key', (req: Request, res: Response) =>
  generateMyfKeyController.handle(req, res),
);

/**
 * verifies a already created myf key acting as "loging" the identity
 */
identityRouter.get(
  '/identity/myf-key',
  (req: Request<unknown, unknown, unknown, IVerifyMyfKeyDTO>, res: Response) =>
    verifyMyfKeyController.handle(req, res),
);

export { identityRouter };

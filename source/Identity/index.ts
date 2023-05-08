import { Request, Router } from 'express';
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

const generateCredentialsController = new GenerateCredentialsController(generateCredentialsUseCase);
const verifyCredentialsTokenController = new VerifyCredentialsTokenController(
  verifyCredentialsUseCase,
);
const loginController = new LoginController(loginUseCase);

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

export { identityRouter };

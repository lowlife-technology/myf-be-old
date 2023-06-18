import { IJWTProvider } from 'source/providers/JWTProvider';
import { IJWTRepository } from 'source/Identity/dataAccess/JWTRepository';
import { IIdentityRepository } from 'source/Identity/dataAccess/IdentityRepository';
import bcrypt from 'bcrypt';
import { ILoginDTO } from '../DTOs/IdentityDTOs/LoginDTO';

export interface ILoginUseCaseResponse {
  message: string;
  response?: { [key: string]: string | number } | unknown;
}

export interface ILoginUseCase {
  execute(data: ILoginDTO): Promise<ILoginUseCaseResponse>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private identityRepository: IIdentityRepository,
    private JWTProvider: IJWTProvider,
    private jwtRepository: IJWTRepository,
  ) {}

  async execute({ email, secret, phone }: ILoginDTO): Promise<ILoginUseCaseResponse> {
    const identityFound = await this.identityRepository.findIdentity(email || phone);

    if (!identityFound) throw new Error('Identity not found.');

    const secretMatchs = await bcrypt.compare(secret, identityFound.secret);

    if (!secretMatchs) throw new Error('Identity not found.');

    const jwt = this.JWTProvider.createAccessToken({ id: identityFound.id });
    await this.jwtRepository.createJWT({ identityId: identityFound.id, jwt });

    return {
      message: 'Login successful',
      response: {
        jwt,
      },
    };
  }
}

import { hash } from 'bcrypt';
import { ICredentialsTokenRepository } from 'source/Identity/dataAccess/CredentialsTokenRepository';
import { IJWTProvider } from 'source/providers/JWTProvider';
import { IJWTRepository } from 'source/Identity/dataAccess/JWTRepository';
import { IIdentityRepository } from '../../dataAccess/IdentityRepository';
import { ICreateIdentityDTO } from '../DTOs/IdentityDTOs/CreateIdentityDTO';

export interface ICreateIdentityUseCaseResponse {
  message: string;
  response?: { [key: string]: string | number } | unknown;
}

export interface ICreateIdentityUseCase {
  execute({ secret, email, phone }: ICreateIdentityDTO): Promise<ICreateIdentityUseCaseResponse>;
}

export class CreateIdentityUseCase implements ICreateIdentityUseCase {
  constructor(
    private identityRepository: IIdentityRepository,
    private credentialsTokenRepository: ICredentialsTokenRepository,
    private JWTProvider: IJWTProvider,
    private jwtRepository: IJWTRepository,
  ) {}

  async execute({
    secret,
    email,
    phone,
  }: ICreateIdentityDTO): Promise<ICreateIdentityUseCaseResponse> {
    const identityFound = await this.identityRepository.findIdentity(email || phone);

    const token = await this.credentialsTokenRepository.findToken({ credential: email || phone });

    if (!token || token.status !== 'verified') {
      throw new Error(
        `Couldn't procceed as credential token for the credential: ${
          email || phone
        } doesn't exist or is not verified.`,
      );
    }

    if (!identityFound) {
      const secretHashed = await hash(secret, 10);

      const newIdentity = await this.identityRepository.createIdentity({
        secret: secretHashed,
        email,
        phone,
      });

      const jwt = this.JWTProvider.createAccessToken(newIdentity.id);

      await this.jwtRepository.createJWT({ identityId: newIdentity.id, jwt });

      await this.credentialsTokenRepository.updateToken(token.id, {
        ...token,
        identityId: newIdentity.id,
      });

      return {
        message: 'Identity created successfully',
        response: { jwt },
      };
    }

    const jwt = this.JWTProvider.createAccessToken(identityFound.id);

    return {
      message: 'Identity exists. You can allow it to be logged in.',
      response: { jwt },
    };
  }
}

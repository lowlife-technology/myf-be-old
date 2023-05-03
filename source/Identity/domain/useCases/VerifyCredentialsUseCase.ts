import { ICredentialsTokenRepository } from 'source/Identity/dataAccess/CredentialsTokenRepository';
import { IIdentityRepository } from '../../dataAccess/IdentityRepository';
import { IVerifyCredentialsDTO } from '../DTOs/VerifyCredentialsDTO';

export interface IVerifyCredentialsUseCaseResponse {}

export interface IVerifyCredentialsUseCase {
  execute({ credential }: IVerifyCredentialsDTO): Promise<IVerifyCredentialsUseCaseResponse>;
}

export class VerifyCredentialsUseCase {
  constructor(
    private identityRepository: IIdentityRepository,
    private credentialsTokenRepository: ICredentialsTokenRepository,
  ) {}

  async execute({ credential }: IVerifyCredentialsDTO): Promise<IVerifyCredentialsUseCaseResponse> {
    const identity = await this.identityRepository.findIdentity(credential);

    if (!identity) {
      // DEBT: save token on DB and add 60 seconds validation
      const credentialTokenData = await this.credentialsTokenRepository.createToken();

      return {
        unique: !identity,
        credentialTokenData,
      };
    }

    return {
      unique: !identity,
    };
  }
}

import { ICredentialsTokenRepository } from 'source/Identity/dataAccess/CredentialsTokenRepository';
import { IIdentityRepository } from '../../../dataAccess/IdentityRepository';
import { IGenerateCredentialsTokenDTO } from '../../DTOs/CredentialsTokenDTOs/GenerateCredentialsTokenDTO';

export interface IGenerateCredentialsUseCaseResponse {}

export interface IGenerateCredentialsUseCase {
  execute({
    credential,
  }: IGenerateCredentialsTokenDTO): Promise<IGenerateCredentialsUseCaseResponse>;
}

export class GenerateCredentialsUseCase {
  constructor(
    private identityRepository: IIdentityRepository,
    private credentialsTokenRepository: ICredentialsTokenRepository,
  ) {}

  async execute({
    credential,
  }: IGenerateCredentialsTokenDTO): Promise<IGenerateCredentialsUseCaseResponse> {
    const identity = await this.identityRepository.findIdentity(credential);
    const token = await this.credentialsTokenRepository.findToken({ credential });

    if (identity) {
      return {
        message: 'User already exist. You can proceed to login',
        response: null,
      };
    }

    if (token) {
      const tokenHasExpired = new Date(token.expireAt).getTime() < new Date().getTime();

      if (!tokenHasExpired) {
        throw new Error(
          `Identity has an unverified token that are under verification timeout. Verify the tokens before generating a new one.`,
        );
      }

      await this.credentialsTokenRepository.deleteToken(token.id);
      const newToken = await this.credentialsTokenRepository.createToken(credential);

      return {
        message: `Token sent to users credentials: ${credential}`,
        response: newToken,
      };
    }

    const credentialTokenData = await this.credentialsTokenRepository.createToken(credential);

    // DEBT: send sms or email with token

    return {
      message: `Token sent to users credentials: ${credential}`,
      response: credentialTokenData,
    };
  }
}

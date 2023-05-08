import { ICredentialsTokenRepository } from 'source/Identity/dataAccess/CredentialsTokenRepository';
import { IVerifyCredentialsTokenDTO } from '../../DTOs/CredentialsTokenDTOs/VerifyCredentialsTokenDTO';
import { CredentialsToken } from '../../Entities/CredentialsToken';

export interface IVerifyCredentialsTokenUseCase {
  execute: (data: IVerifyCredentialsTokenDTO) => Promise<CredentialsToken>;
}

export class VerifyCredentialsTokenUseCase {
  constructor(private credentialsTokenRepository: ICredentialsTokenRepository) {}

  async execute({ token, tokenId }: IVerifyCredentialsTokenDTO) {
    const tokenFound = await this.credentialsTokenRepository.findToken({ id: tokenId });

    if (!tokenFound) {
      throw new Error('Token not found');
    }

    if (String(tokenFound.token) !== String(token)) {
      throw new Error('Token is invalid');
    }

    if (tokenFound.status !== 'unverified') {
      throw new Error(`Cannot revalidate token as token status is ${tokenFound.status}`);
    }

    const tokenHasExpired = new Date(tokenFound.expireAt).getTime() < new Date().getTime();

    if (tokenHasExpired) {
      await this.credentialsTokenRepository.updateToken(tokenFound.id, {
        ...tokenFound,
        status: 'expired',
      });

      throw new Error('Token has expired');
    }

    const updatedToken = await this.credentialsTokenRepository.updateToken(tokenFound.id, {
      ...tokenFound,
      status: 'verified',
    });
    return updatedToken;
  }
}

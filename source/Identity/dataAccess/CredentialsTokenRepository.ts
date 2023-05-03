import { prisma } from '../../../prisma';
import { CredentialsToken } from '../domain/Entities/CredentialsToken';

export interface ICredentialsTokenRepository {
  createToken(identityId?: string): Promise<CredentialsToken>;
}

export class CredentialsTokenRepository {
  static async createToken(identityId?: string): Promise<CredentialsToken> {
    return prisma.token.create({
      data: new CredentialsToken({ identityId }),
    }) as unknown as CredentialsToken;
  }
}

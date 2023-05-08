import { prisma } from '../../../prisma';
import { CredentialsToken } from '../domain/Entities/CredentialsToken';

export interface IFindTokenParams {
  id?: string;
  identityId?: string;
  token?: number;
  credential?: string;
}
export interface ICredentialsTokenRepository {
  createToken(credential: string, identityId?: string): Promise<CredentialsToken>;
  updateToken(id: string, data: CredentialsToken): Promise<CredentialsToken>;
  findToken(params: IFindTokenParams): Promise<CredentialsToken>;
  deleteToken(id: string): Promise<CredentialsToken[]>;
  findManyTokens(params: IFindTokenParams): Promise<CredentialsToken[]>;
}

export class CredentialsTokenRepository {
  static async createToken(credential?: string, identityId?: string): Promise<CredentialsToken> {
    const token = (await prisma.token.create({
      data: new CredentialsToken({ credential, identityId }),
    })) as unknown as CredentialsToken;

    return token;
  }

  static async updateToken(id: string, data: CredentialsToken) {
    return prisma.token.update({
      where: { id },
      data,
    }) as unknown as CredentialsToken;
  }

  static async findToken(params: IFindTokenParams): Promise<CredentialsToken> {
    return prisma.token.findFirst({
      where: params,
    }) as unknown as CredentialsToken;
  }

  static async deleteToken(id: string) {
    return prisma.token.delete({
      where: { id },
    }) as unknown as CredentialsToken[];
  }

  static async findManyTokens(params: IFindTokenParams): Promise<CredentialsToken[]> {
    return prisma.token.findMany({
      where: params,
    }) as unknown as CredentialsToken[];
  }
}

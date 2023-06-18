import { JWT } from '../domain/Entities/JWT';
import { prisma } from '../../../prisma';

export interface ICreateJWTPayload {
  identityId?: string;
  myfKeyId?: string;
  jwt: string;
}

export interface IJWTRepository {
  createJWT(createJWTPayload: ICreateJWTPayload): Promise<JWT>;
}

export class JWTRepository {
  static async createJWT(createJWTPayload: ICreateJWTPayload): Promise<JWT> {
    return prisma.jwt.create({
      data: {
        createdAt: String(new Date().toISOString()),
        updatedAt: String(new Date().toISOString()),
        ...createJWTPayload,
      },
    });
  }
}

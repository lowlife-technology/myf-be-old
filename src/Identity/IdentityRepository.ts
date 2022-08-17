import { PrismaClient } from '@prisma/client';
import { IdentityEntity } from './IdentityEntity';

export interface IIdentityRepository {
  readIdentity(jwt: string): Promise<IdentityEntity>;
}

export class IdentityRepository implements IIdentityRepository {
  constructor(private database: PrismaClient) {
    this.database = database;
  }

  async readIdentity(jwt: string): Promise<IdentityEntity> {
    return this.database.identity.findFirst({
      where: {
        bearer: {
          token: jwt
        }
      }
    });
  }
}

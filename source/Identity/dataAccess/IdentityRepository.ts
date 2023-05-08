import { prisma } from '../../../prisma';
import { IIdentity, Identity } from '../domain/Entities/Identity';

export interface IIdentityRepository {
  createIdentity(data: IIdentity): Promise<Identity>;
  findIdentity(credential: string): Promise<Identity | null>;
}

export const IdentityRepository = class {
  static async createIdentity(data: IIdentity): Promise<Identity> {
    return prisma.identity.create({ data: new Identity(data) });
  }

  static async findIdentity(credential: string): Promise<Identity | null> {
    const response = await prisma.identity.findFirst({
      where: { OR: [{ email: credential }, { phone: credential }] },
    });

    return response;
  }
};

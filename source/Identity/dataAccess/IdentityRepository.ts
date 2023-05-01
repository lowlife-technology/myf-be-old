import { prisma } from '../../../prisma';
import { IIdentity, Identity } from '../domain/Entities/Identity';

export interface IIdentityRepository {
  createIdentity(data: IIdentity): Promise<IIdentity | unknown>;
  findIdentity(credential: string): Promise<IIdentity | null>;
}

export const IdentityRepository = class {
  static async createIdentity(data: IIdentity): Promise<IIdentity | unknown> {
    // DEBT: create entity if not already exist on DB.

    const userExist = await prisma.identity.findFirst({
      where: { OR: [{ email: data.email }, { phone: data.phone }] },
    });

    // DEBT: resolve to login
    if (userExist) throw new Error('Go to login.');

    const response = await prisma.identity.create({ data: new Identity(data) });

    return response;
  }

  static async findIdentity(credential: string): Promise<IIdentity | null> {
    const response = await prisma.identity.findFirst({
      where: { OR: [{ email: credential }, { phone: credential }] },
    });

    return response;
  }
};

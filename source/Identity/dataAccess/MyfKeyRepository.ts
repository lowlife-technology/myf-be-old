import { prisma } from 'prisma';
import { IMyfKey, MyfKey } from '../domain/Entities/MyfKey';

export interface IMyfKeyRepository {
  generateMyfKey(): Promise<IMyfKey>;
  findMyfKey({ myfKey, myfKeyId }: { myfKey?: string; myfKeyId?: string }): Promise<IMyfKey>;
}

export const MyfKeyRepository: IMyfKeyRepository = class {
  static async generateMyfKey(): Promise<IMyfKey> {
    const myfKey = new MyfKey();
    const foundMyfKey = await this.findMyfKey({ myfKey: myfKey.myfKey });

    if (foundMyfKey)
      throw new Error(
        'key already registered on DB. This is a backend debt. Please report. You can generate another key in order to bypass.',
      );

    return prisma.myfKey.create({ data: myfKey });
  }

  static async findMyfKey({
    myfKey,
    myfKeyId,
  }: {
    myfKey?: string;
    myfKeyId?: string;
  }): Promise<IMyfKey> {
    return prisma.myfKey.findFirst({ where: { myfKeyId, myfKey } });
  }
};

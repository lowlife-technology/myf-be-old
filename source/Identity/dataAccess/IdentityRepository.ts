import { IIdentity, Identity } from '../domain/Entities/Identity';

export interface IIdentityRepository {
  createIdentity(data: IIdentity): Promise<IIdentity | unknown>;
}

export const IdentityRepository = class {
  static async createIdentity(data: IIdentity): Promise<IIdentity | unknown> {
    // create entity if not already exist on DB.
    const identity = new Identity(data);
    return identity;
  }
};

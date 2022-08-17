import { IdentityEntity } from '../IdentityEntity';
import { IIdentityRepository } from '../IdentityRepository';

export interface IReadIdentityUseCase {
  execute(userJWT: string): Promise<IdentityEntity>;
}

export class ReadIdentityUseCase {
  constructor(private identityRepository: IIdentityRepository) {}

  async execute(userJWT: string) {
    const user = await this.identityRepository.readIdentity(userJWT);
    if (!user) throw new Error('User not found.');

    return user;
  }
}

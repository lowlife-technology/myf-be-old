import { IIdentityRepository } from '../../dataAccess/IdentityRepository';
import { IVerifyCredentialsDTO } from '../DTOs/VerifyCredentialsDTO';

export interface IVerifyCredentialsUseCaseResponse {}

export interface IVerifyCredentialsUseCase {
  execute({ credential }: IVerifyCredentialsDTO): Promise<IVerifyCredentialsUseCaseResponse>;
}

export class VerifyCredentialsUseCase {
  constructor(private identityRepository: IIdentityRepository) {}

  async execute({ credential }: IVerifyCredentialsDTO): Promise<IVerifyCredentialsUseCaseResponse> {
    const identity = await this.identityRepository.findIdentity(credential);

    return identity;
  }
}

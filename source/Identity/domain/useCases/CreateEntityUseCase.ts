import { IIdentityRepository } from '../../dataAccess/IdentityRepository';
import { ICreateIdentityDTO } from '../DTOs/CreateIdentityDTO';

export interface ICreateIdentityUseCaseResponse {
  message: string;
  response?: { [key: string]: string | number } | unknown;
}

export interface ICreateIdentityUseCase {
  execute({ secret, email, phone }: ICreateIdentityDTO): Promise<ICreateIdentityUseCaseResponse>;
}

export class CreateIdentityUseCase implements ICreateIdentityUseCase {
  constructor(private identityRepository: IIdentityRepository) {}

  async execute({
    secret,
    email,
    phone,
  }: ICreateIdentityDTO): Promise<ICreateIdentityUseCaseResponse> {
    // DEBT: hash secret

    await this.identityRepository.createIdentity({ secret, email, phone });

    if (email) {
      // DEBT: send email

      return {
        message: 'email sent to user.',
        response: { token: 123456 },
      };
    }

    // DEBT: generate token
    // DEBT: save token on DB
    // DEBT: send sms
    return {
      message: 'sms sent to user.',
      response: { token: 123456 },
    };
  }
}

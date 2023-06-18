import { IJWTRepository } from 'source/Identity/dataAccess/JWTRepository';
import { IMyfKeyRepository } from 'source/Identity/dataAccess/MyfKeyRepository';
import { IJWTProvider } from 'source/providers/JWTProvider';
import { IVerifyMyfKeyDTO } from '../../DTOs/MyfKeyDTOs/VerifyMyfKeyDTO';

export interface IVerifyMyfKeyUseCaseResponse {
  message: string;
  response: {
    jwt: string;
  };
}

export interface IVerifyMyfKeyUseCase {
  execute(myfKey: IVerifyMyfKeyDTO): Promise<IVerifyMyfKeyUseCaseResponse>;
}

export class VerifyMyfKeyUseCase implements IVerifyMyfKeyUseCase {
  constructor(
    private myfKeyRepository: IMyfKeyRepository,
    private JWTRepository: IJWTRepository,
    private JWTProvider: IJWTProvider,
  ) {}

  async execute({ myfKey, myfKeyId }: IVerifyMyfKeyDTO): Promise<IVerifyMyfKeyUseCaseResponse> {
    const foundMyfKey = await this.myfKeyRepository.findMyfKey({ myfKey, myfKeyId });

    if (!foundMyfKey) {
      throw new Error('Invalid MyfKey, please try again.');
    }

    const jwt = this.JWTProvider.createAccessToken({ id: myfKeyId });
    this.JWTRepository.createJWT({ jwt, myfKeyId });

    return {
      message: 'Myf Key successfully verified.',
      response: {
        jwt,
      },
    };
  }
}

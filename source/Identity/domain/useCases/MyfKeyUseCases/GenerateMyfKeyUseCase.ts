import { IMyfKeyRepository } from 'source/Identity/dataAccess/MyfKeyRepository';
import type { IMyfKey } from '../../Entities/MyfKey';

export interface IGenerateMyfKeyUseCaseResponse {
  message: string;
  response?: IMyfKey;
}
export interface IGenerateMyfKeyUseCase {
  execute(): Promise<IGenerateMyfKeyUseCaseResponse>;
}

export class GenerateMyfKeyUseCase implements IGenerateMyfKeyUseCase {
  constructor(private myfKeyRepository: IMyfKeyRepository) {}

  async execute(): Promise<IGenerateMyfKeyUseCaseResponse> {
    const myfKey = await this.myfKeyRepository.generateMyfKey();

    return {
      message: 'Myf Key generated',
      response: {
        ...myfKey,
      },
    };
  }
}

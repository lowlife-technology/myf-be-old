import { Request, Response } from 'express';
import { IGenerateMyfKeyUseCase } from 'source/Identity/domain/useCases/MyfKeyUseCases/GenerateMyfKeyUseCase';

export class GenerateMyfKeyController {
  constructor(private generateMyfKeyUseCase: IGenerateMyfKeyUseCase) {}

  async handle(_: Request, response: Response): Promise<Response> {
    try {
      const generateMyfKeyUseCase = await this.generateMyfKeyUseCase.execute();

      return response.status(201).send(generateMyfKeyUseCase);
    } catch (error) {
      const { message } = error as Error;

      return response.status(400).send({
        message,
        response: null,
      });
    }
  }
}

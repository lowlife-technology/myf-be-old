import { Request, Response } from 'express';
import { IGenerateCredentialsTokenDTO } from '../../domain/DTOs/CredentialsTokenDTOs/GenerateCredentialsTokenDTO';
import { IGenerateCredentialsUseCase } from '../../domain/useCases/CredentialsToken/GenerateCredentialsUseCase';

export class GenerateCredentialsController {
  constructor(private generateCredentialsUseCase: IGenerateCredentialsUseCase) {}

  async handle(
    request: Request<unknown, unknown, unknown, IGenerateCredentialsTokenDTO>,
    response: Response,
  ): Promise<Response> {
    try {
      const { credential } = request.query;

      if (!credential) {
        return response.status(400).json({
          message: 'credential is required. It must be email or phone.',
          response: null,
        });
      }

      return response
        .status(200)
        .json(await this.generateCredentialsUseCase.execute({ credential }));
    } catch (error) {
      const { message } = error as Error;

      return response.status(400).json({
        message: message || 'Unexpected error',
        response: null,
      });
    }
  }
}

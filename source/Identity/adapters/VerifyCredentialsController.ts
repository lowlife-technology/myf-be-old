import { Request, Response } from 'express';
import { IVerifyCredentialsDTO } from '../domain/DTOs/VerifyCredentialsDTO';
import { IVerifyCredentialsUseCase } from '../domain/useCases/VerifyCredentialsUseCase';

export class VerifyCredentialsController {
  constructor(private verifyCredentialsUseCase: IVerifyCredentialsUseCase) {}

  async handle(
    request: Request<unknown, unknown, unknown, IVerifyCredentialsDTO>,
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

      return response.status(200).json({
        message: 'Credentials verified successfully.',
        response: await this.verifyCredentialsUseCase.execute({ credential }),
      });
    } catch (error) {
      const { message } = error as Error;

      return response.status(400).json({
        message: message || 'Unexpected error',
        response: null,
      });
    }
  }
}

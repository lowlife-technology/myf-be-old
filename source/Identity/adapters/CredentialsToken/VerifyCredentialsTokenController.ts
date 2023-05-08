import { Request, Response } from 'express';
import { IVerifyCredentialsTokenDTO } from '../../domain/DTOs/CredentialsTokenDTOs/VerifyCredentialsTokenDTO';
import { IVerifyCredentialsTokenUseCase } from '../../domain/useCases/CredentialsToken/VerifyCredentialsTokenUseCase';

export class VerifyCredentialsTokenController {
  constructor(private verifyCredentialsTokenUseCase: IVerifyCredentialsTokenUseCase) {}

  async handle(
    request: Request<unknown, unknown, unknown, IVerifyCredentialsTokenDTO>,
    response: Response,
  ) {
    try {
      const { token, tokenId } = request.query;

      if (!token || !tokenId) {
        return response.status(400).json({
          message: 'Missing token or tokenId',
          response: null,
        });
      }

      return response.status(200).json({
        message: 'Success',
        response: await this.verifyCredentialsTokenUseCase.execute({ token, tokenId }),
      });
    } catch (error) {
      const { message } = error as Error;

      return response.status(400).json({
        message,
        response: { error },
      });
    }
  }
}

import { Request, Response } from 'express';
import { IVerifyMyfKeyDTO } from 'source/Identity/domain/DTOs/MyfKeyDTOs/VerifyMyfKeyDTO';
import { IVerifyMyfKeyUseCase } from 'source/Identity/domain/useCases/MyfKeyUseCases/VerifyMyfKeyUseCase';

export class VerifyMyfKeyController {
  constructor(private verifyMyfKeyUseCase: IVerifyMyfKeyUseCase) {}

  async handle(
    request: Request<unknown, unknown, unknown, IVerifyMyfKeyDTO>,
    response: Response,
  ): Promise<Response> {
    try {
      const { myfKey, myfKeyId } = request.query;

      if (!myfKey || !myfKeyId) {
        return response.status(400).send({
          message: 'myfKey and myfKeyId properties are required.',
          response: null,
        });
      }

      const verifyMyfKeyUseCase = await this.verifyMyfKeyUseCase.execute({ myfKey, myfKeyId });

      return response.status(200).send(verifyMyfKeyUseCase);
    } catch (error) {
      const { message } = error as Error;

      return response.status(400).send({
        message,
        response: null,
      });
    }
  }
}

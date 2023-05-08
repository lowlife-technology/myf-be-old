import { Request, Response } from 'express';
import { ILoginDTO } from '../domain/DTOs/IdentityDTOs/LoginDTO';
import { ILoginUseCase } from '../domain/useCases/LoginUseCase';

export class LoginController {
  constructor(private loginUseCase: ILoginUseCase) {}

  async handle(
    request: Request<unknown, unknown, ILoginDTO>,
    response: Response,
  ): Promise<Response> {
    try {
      const { secret, email, phone } = request.body;

      if (!secret && (!email || !phone)) {
        return response.status(400).send({
          message: 'secret is required and email or phone are required.',
          response: null,
        });
      }

      if (typeof secret !== 'string') {
        return response.status(400).send({
          message: 'secret must be a string.',
          response: null,
        });
      }

      if (email && typeof email !== 'string') {
        return response.status(400).send({
          message: 'email must be a string.',
          response: null,
        });
      }

      if (phone && typeof phone !== 'string') {
        return response.status(400).send({
          message: 'phone must be a string.',
          response: null,
        });
      }

      const loginUseCase = await this.loginUseCase.execute({ secret, email, phone });

      return response.status(201).send(loginUseCase);
    } catch (error) {
      const { message } = error as Error;

      return response.status(400).send({
        message,
        response: null,
      });
    }
  }
}

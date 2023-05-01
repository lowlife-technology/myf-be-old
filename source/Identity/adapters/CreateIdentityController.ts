import { Request, Response } from 'express';
import { ICreateIdentityUseCase } from '../domain/useCases/CreateEntityUseCase';
import { ICreateIdentityDTO } from '../domain/DTOs/CreateIdentityDTO';

export class CreateIdentityController {
  constructor(private createIdentityUseCase: ICreateIdentityUseCase) {}

  async handle(
    request: Request<unknown, unknown, ICreateIdentityDTO>,
    response: Response,
  ): Promise<Response> {
    const { secret, email, phone } = request.body;
    try {
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

      const identityUseCase = await this.createIdentityUseCase.execute({ secret, email, phone });

      return response.status(201).send(identityUseCase);
    } catch (error) {
      const { message } = error as Error;

      return response.status(400).send({
        message,
        response: null,
      });
    }
  }
}

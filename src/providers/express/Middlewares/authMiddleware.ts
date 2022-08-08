import { NextFunction, Request } from 'express';
import { IResponse } from '../IResponse';

export interface IAuthMiddleware<request = Request> {
  authorizeUser(
    request: request,
    response: IResponse,
    next: NextFunction,
  ): Promise<IResponse | void>;
}

export class AuthMiddleware<request = Request> implements IAuthMiddleware<request> {
  // TODO: IIdentityRepository is missing.
  constructor(private identityRepository: any) {
    Object.assign(this, identityRepository);
  }

  async authorizeUser(
    // TODO: probably will have to make so the "& Request" isnt necessary.
    request: request & Request,
    response: IResponse,
    next: NextFunction,
  ): Promise<IResponse | void> {
    try {
      const foundUser = await this.identityRepository.findFirst({
        where: {
          id: request.headers.authorization,
        },
      });

      if (!foundUser) return response.status(401).send({ message: 'Unauthorized.' });
      return next(foundUser.id);
    } catch (error) {
      return response.status(500).send({ message: 'Internal Error.' });
    }
  }
}

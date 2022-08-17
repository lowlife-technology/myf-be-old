import { Request } from 'express';
import { IResponse } from './IResponse';

export interface IPostRequest<requestBody> extends Request<undefined, IResponse, requestBody> {}

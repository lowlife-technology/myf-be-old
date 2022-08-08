import { Response } from 'express';

type responseBodyType = {
  message: string;
};

export interface IResponse<responseBody = responseBodyType> extends Response<responseBody> {
  responseBody: responseBodyType;
}

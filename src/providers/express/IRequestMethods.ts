import { Request } from 'express';

export interface IPostRequest<requestBody, responseBody>
  extends Request<undefined, responseBody, requestBody> {
  requestbody: requestBody;
  responseBody: responseBody;
}

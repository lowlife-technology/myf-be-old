import { Response } from 'express';

// type responseBodyType = {
//   message: string;
// };

export interface IResponse extends Response {}

// TODO: not working yet.
// export interface IResponse<responseBody = responseBodyType> extends Response<responseBody> {}

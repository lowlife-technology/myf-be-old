import { JwtPayload, sign, verify } from 'jsonwebtoken';

export interface IJWTProvider {
  createAccessToken(identityId: string): string;
  verifyAccessToken(token: string): string | JwtPayload;
}

export class JWTProvider implements IJWTProvider {
  secretKey: string;

  constructor() {
    this.secretKey = process.env.ACCESS_TOKEN_SECRET!;
  }

  createAccessToken(identityId: string) {
    return sign({ identityId }, this.secretKey);
  }

  verifyAccessToken(token: string) {
    return verify(token, this.secretKey);
  }
}

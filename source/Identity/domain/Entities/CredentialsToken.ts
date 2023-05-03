import { v4 as uuid } from 'uuid';

export interface ICredentialsToken {
  identityId: string;
}

export class CredentialsToken {
  id: string;
  identityId: string;
  status: 'valid' | 'invalid';
  token: number;
  expireAt: string;

  constructor({ identityId }: ICredentialsToken) {
    this.id = uuid();
    this.identityId = identityId || null;
    this.status = 'valid';

    const credentialsToken = Math.floor(100000 + Math.random() * 900000);
    this.token = credentialsToken;

    const now = new Date();
    const expirationTime = String(new Date(now.getTime() + 60 * 1000).toISOString());
    this.expireAt = expirationTime;
  }
}

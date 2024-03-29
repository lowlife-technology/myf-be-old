import { v4 as uuid } from 'uuid';

export interface ICredentialsToken {
  identityId?: string;
  credential: string;
}

export class CredentialsToken {
  id: string;
  identityId: string;
  status: 'verified' | 'unverified' | 'expired';
  token: number;
  expireAt: string;
  credential: string;

  constructor({ credential, identityId }: ICredentialsToken) {
    this.id = uuid();
    this.identityId = identityId || null;
    this.status = 'unverified';
    this.credential = credential;

    const credentialsToken = Math.floor(100000 + Math.random() * 900000);
    this.token = credentialsToken;

    const now = new Date();
    const expirationTime = String(new Date(now.getTime() + 60 * 1000).toISOString());
    this.expireAt = expirationTime;
  }
}

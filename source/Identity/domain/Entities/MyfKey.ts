import { v4 as uuid } from 'uuid';

export interface IMyfKey {
  myfKeyId: string;
  myfKey: string;
}

export class MyfKey {
  myfKeyId: string;
  myfKey: string;

  constructor() {
    this.myfKeyId = uuid();
    this.myfKey = this.generateRandomId();
  }

  #alpha = 'abcdefg';
  #number = '123456790';

  #getIdPartIndex(part: string) {
    return Math.floor(Math.random() * (part.length - 1));
  }

  generateRandomId() {
    const id = [];

    for (let i = 0; i < 3; i += 1) {
      const alphaIndex = this.#getIdPartIndex(this.#alpha);
      id.push(this.#alpha[alphaIndex]);
    }

    id.push('-');

    for (let i = 0; i < 3; i += 1) {
      const numberIndex = this.#getIdPartIndex(this.#number);
      id.push(this.#number[numberIndex]);
    }

    return id.join('');
  }
}

import { v4 as uuidv4 } from 'uuid';

export class IdentityEntity {
  id?: string;
  email: string;
  fullName: string;
  password: string;

  constructor(props: Omit<IdentityEntity, 'id'>, id?: string) {
    if (!id) {
      this.id = uuidv4();
    }

    // Object.assign(this, props);
    this.email = props.email;

    this.fullName = props.fullName;
    this.password = props.password;

    if (!this.email) throw new Error('email is required.');
    if (!this.fullName) throw new Error('full name is required');
    if (!this.password) throw new Error('password is required');
    // TODO: add more business rules
  }
}

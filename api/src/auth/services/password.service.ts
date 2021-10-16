import { compare, genSalt, hash } from 'bcrypt';

export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }
  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    return compare(providedPass, storedPass);
  }
}

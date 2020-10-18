import bcrypt from "bcrypt";
import PasswordEncoder from "./PasswordEncoder";

class BcryptPasswordEncoder implements PasswordEncoder {
  encode(password: string): Promise<string> | string {
    return bcrypt.hash(password, 10);
  }

  check(password: string, hash: string): Promise<boolean> | boolean {
    return bcrypt.compare(password, hash);
  }

}
export default BcryptPasswordEncoder;
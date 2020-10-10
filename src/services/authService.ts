import resolve from "../helpers/resolve";
import {User} from "../entities/User";
import {Connection} from "typeorm";

class AuthService {
  /**
   * @todo Implement register method(I created this method now to test the database)
   *
   * @param userData
   */
  async register(userData: any) {
    const db = resolve(Connection);

    let user = new User();

    user.name = "Med Dev";
    user.email = "dev@example.org";
    user.password = 'hash';

    console.log('Register...', userData);

    return await db.manager.save(user);
  }


}

export default AuthService;
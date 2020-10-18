import resolve from "../helpers/resolve";
import {User} from "../entities/User";
import {Connection, getRepository} from "typeorm";
import bcrypt from 'bcrypt';
import {AccessToken} from "../entities/AccessToken";
import crypto from 'crypto';
import {Client} from "../entities/Client";

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

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async generateAccessToken(user: User, client: Client, scope: string[]): Promise<AccessToken> {
    const accessToken = new AccessToken();

    accessToken.token = crypto.randomBytes(64).toString('hex');
    accessToken.user = user;
    accessToken.client = client;
    accessToken.scope = scope || [];

    const accessTokenRepo = getRepository(AccessToken);

    await accessTokenRepo.save(accessToken);

    return accessToken
  }

  async findTokenWithUser(token: string): Promise<AccessToken | null> {
    const accessTokenRepo = getRepository(AccessToken);

    const accessToken = await accessTokenRepo.findOne({token}, {relations: ['user']});

    if (!accessToken) {
      return null;
    }

    return accessToken;
  }

}

export default AuthService;
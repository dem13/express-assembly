import resolve from "../core/helpers/resolve";
import {User} from "../entities/User";
import UserModel from "../models/User";
import {Connection, getRepository} from "typeorm";
import bcrypt from 'bcrypt';
import {AccessToken} from "../entities/AccessToken";
import crypto from 'crypto';
import {Client} from "../entities/Client";

class AuthService {

  /**
   * @param userData
   */
  async register(userData: UserModel) {
    const db = resolve(Connection);

    let user = new User();

    user.name = userData.name;
    user.email = userData.email;
    user.password = await this.hashPassword(userData.password);

    user = await db.manager.save(user);

    delete user.password;

    return user;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async generateAccessToken(user: User, client: Client | null = null, scope: string[] = []): Promise<AccessToken> {
    const accessToken = new AccessToken();

    accessToken.token = crypto.randomBytes(64).toString('hex');
    accessToken.user = user;
    if(client) accessToken.client = client;
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
import {User} from "../entities/User";
import UserModel from "../models/User";
import {getRepository} from "typeorm";
import {AccessToken} from "../entities/AccessToken";
import crypto from 'crypto';
import {Client} from "../entities/Client";
import UserService from "./UserService";
import {autoInjectable} from "tsyringe";
import {UserAlreadyExistsError} from "../errors/UserAlreadyExistsError";

@autoInjectable()
class AuthService {

  constructor(private userService: UserService) {
  }

  /**
   * @param userData
   */
  async register(userData: UserModel) {
    if(await this.userService.userExists(userData.email)) {
      throw new UserAlreadyExistsError(`User with email ${userData.email} already exists.`);
    }

    const user = await this.userService.create(userData);

    return await this.generateAccessToken(user);
  }

  async generateAccessToken(user: User, client: Client | null = null, scope: string[] = []): Promise<AccessToken> {
    const accessToken = new AccessToken();

    accessToken.token = crypto.randomBytes(64).toString('hex');
    accessToken.user = user;
    if(client) accessToken.client = client;
    accessToken.scope = scope || [];

    const accessTokenRepo = getRepository(AccessToken);

    await accessTokenRepo.save(accessToken);

    return accessToken;
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

import UserModel from "../models/User";
import {getRepository, Repository} from "typeorm";
import {User} from "../entities/User";
import {inject, injectable} from "tsyringe";
import PasswordEncoder from "../core/auth/PasswordEncoder";

@injectable()
export default class UserService {
  private userRepo: Repository<User>;
  private passwordEncoder: PasswordEncoder

  constructor(@inject("PasswordEncoder") passwordEncoder: PasswordEncoder) {
    this.userRepo = getRepository(User);
    this.passwordEncoder = passwordEncoder;
  }

  async create(userData: UserModel): Promise<User> {
    let user = new User();

    user.name = userData.name;
    user.email = userData.email;
    user.password = await this.passwordEncoder.encode(userData.password);

    user = await this.userRepo.save(user);

    delete user.password;

    return user;
  }

  /**
   * Check if user with proved email already exists
   *
   * @param email
   */
  async userExists(email: string): Promise<boolean> {
     return !!await this.userRepo.findOne({email});
  }
}

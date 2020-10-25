import AuthService from "../services/AuthService";
import {autoInjectable} from "tsyringe";
import {Body, Controller, Post} from "routing-controllers";
import User from "../models/User";
import {UserAlreadyExistsError} from "../errors/UserAlreadyExistsError";
import {BadRequestError} from "../errors/BadRequestError";

@Controller()
@autoInjectable()
class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('/api/auth/register')
  async register(@Body() userData: User) {
    try {
      const accessToken = await this.authService.register(userData);

      return {
        data: {
          user: accessToken.user,
          access_token: accessToken.token
        }
      }
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        throw new BadRequestError(err.message, {email: err.message});
      }
    }
  }
}

export default AuthController;

import AuthService from "../services/AuthService";
import {autoInjectable} from "tsyringe";
import {Body, Controller, Post} from "routing-controllers";
import User from "../models/User";

@Controller()
@autoInjectable()
class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/api/auth/register')
  async register(@Body() userData: User ) {
    const accessToken = await this.authService.register(userData);

    return {
      user: accessToken.user,
      access_token: accessToken.token
    }
  }
}

export default AuthController;
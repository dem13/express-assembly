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
    const user = await this.authService.register(userData);
    const accessToken = await this.authService.generateAccessToken(user);

    return {data: {user, access_token: accessToken.token}};
  }
}

export default AuthController;
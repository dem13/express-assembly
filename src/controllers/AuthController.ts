import {Request, Response} from 'express'
import AuthService from "../services/AuthService";
import {autoInjectable} from "tsyringe";
import {Controller, Post, Req, Res} from "routing-controllers";

@Controller()
@autoInjectable()
class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/api/auth/register')
  async register(@Req() req: Request, @Res() res: Response ) {
    const user = await this.authService.register(req.body);
    return ({soon: '...', user});
  }
}

export default AuthController;
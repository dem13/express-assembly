import {Request, Response} from 'express'
import AuthService from "../services/AuthService";
import {injectable} from "tsyringe";

@injectable()
class AuthController {

  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const user = await this.authService.register(req.body);
    res.send({soon: '...', user});
  }
}

export default AuthController;
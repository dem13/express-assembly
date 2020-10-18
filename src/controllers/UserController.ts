import {Authorized, Controller, CurrentUser, Get, Req, Res} from "routing-controllers";
import {User} from "../entities/User";

@Controller('/user')
class UserController {

  @Authorized()
  @Get('/me')
  public async me(@Req() req: any, @Res() res: any, @CurrentUser() user: User) {
    return res.send({data: user});
  }
}

export default UserController;
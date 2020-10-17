import passport from "passport";
import oauth2ClientPasswordStrategy from "../core/strategies/oauth2ClientPassword";
import oauth2orize, {createServer, OAuth2Server} from 'oauth2orize';
import {container} from "tsyringe";
import {getRepository} from "typeorm";
import {User} from "../entities/User";
import resolve from "../helpers/resolve";
import AuthService from "../services/AuthService";
import {Client} from "../entities/Client";

export default () => {
  const server = createServer();

  passport.use(oauth2ClientPasswordStrategy);

  server.exchange(oauth2orize.exchange.password(async function (
    client: Client,
    email: string,
    password: string,
    scope: string[],
    done
  ) {
    const authService = resolve(AuthService);

    const userRepo = getRepository(User);
    try {
      const user = await userRepo.findOne({email});

      if (!user || !await authService.comparePassword(password, user.password)) return done(null, false);

      const accessToken = await authService.generateAccessToken(user, client, scope);

      return done(null, accessToken.token);
    } catch (err) {
      done(err);
    }
  }));

  container.registerInstance(OAuth2Server, server);
}
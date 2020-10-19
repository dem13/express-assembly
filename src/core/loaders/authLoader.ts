import passport from "passport";
import {container} from "tsyringe";
import {getRepository} from "typeorm";
import oauth2orize, {createServer, OAuth2Server} from 'oauth2orize';

import resolve from "../helpers/resolve";
import {User} from "../../entities/User";
import {Client} from "../../entities/Client";
import httpBearer from "../strategies/httpBearer";
import AuthService from "../../services/AuthService";
import PasswordEncoder from "../auth/PasswordEncoder";
import oauth2ClientPasswordStrategy from "../strategies/oauth2ClientPassword";

export default () => {
  const server = createServer();

  passport.use(httpBearer);
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

      const passwordEncoder = resolve<PasswordEncoder>("PasswordEncoder");

      if (!user || !await passwordEncoder.check(password, user.password || '')) return done(null, false);

      const accessToken = await authService.generateAccessToken(user, client, scope);

      return done(null, accessToken.token);
    } catch (err) {
      done(err);
    }
  }));

  container.registerInstance(OAuth2Server, server);
}
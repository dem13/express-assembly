import {Strategy as BearerStrategy} from 'passport-http-bearer';
import resolve from "../helpers/resolve";
import AuthService from "../../services/AuthService";

export default new BearerStrategy(async function (token, done) {
  const authService = resolve(AuthService);
  try {
    const accessToken = await authService.findTokenWithUser(token);

    if(!accessToken) return done(null, false);

    return done(null, accessToken.user, {scope: accessToken.scope})
  } catch (err) {
    done(err)
  }
});


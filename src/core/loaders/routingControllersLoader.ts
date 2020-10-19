import passport from "passport";
import {Express} from "express";
import {Action, useExpressServer} from "routing-controllers";

export default (app: Express): Express => {
  return useExpressServer(app, {
    /**
     * @param action
     * @param roles
     */
    authorizationChecker: (action: Action, roles: string[]) => {
      return new Promise<boolean>(((resolve, reject) => {
        passport.authenticate('bearer', {session: false}, (err, user, info) => {
          if (err) return reject(err);
          if (!user) return resolve(false);

          action.request.user = user;

          resolve(true);
        })(action.request, action.response, action.next);
      }));
    },
    currentUserChecker: (action: Action) => {
      return action.request.user
    },
    defaultErrorHandler: false,
    controllers: [__dirname + "/../../controllers/*.js", __dirname + "/../../controllers/*.ts"] // and configure it the way you need (controllers, validation, etc.)
  });
}
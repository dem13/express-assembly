import express from 'express';
import passport from "passport";
import {OAuth2Server} from 'oauth2orize'
import {container} from "tsyringe";

export default async () => {
  const router = express.Router();

  const server = container.resolve(OAuth2Server);

  router.post(
    '/oauth/token',
    passport.authenticate('oauth2-client-password', {session: false, failWithError: true}),
    server.token(),
    server.errorHandler()
  );

  return router
};
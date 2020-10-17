import {Strategy as ClientPasswordStrategy} from 'passport-oauth2-client-password';
import {getRepository} from "typeorm";
import {Client} from "../../entities/Client";

const strategy = new ClientPasswordStrategy(async function (clientId, clientSecret, done) {
  const clientRepo = getRepository(Client);
  try {
    const client = await clientRepo.findOne(clientId);

    if (!client) return done(null, false);
    if (client.clientSecret != clientSecret) return done(null, false);

    done(null, client);
  } catch (err) {
    return done(err);
  }
});

export default strategy;
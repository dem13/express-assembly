import {createConnection} from 'typeorm';
import config from 'config';


export default async () => {
  try {
    return await createConnection({
      type: 'postgres',
      host: config.get<string>('dbHost'),
      port: config.get<number>('dbPort'),
      username: config.get<string>('dbUser'),
      password: config.get<string>('dbPassword'),
      database: config.get<string>('dbName'),
      entities: [__dirname + "/../entities/*.ts"],
      synchronize: true,
    });
  } catch (err) {
    console.log(err);
  }
}
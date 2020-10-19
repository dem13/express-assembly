import config from 'config';
import {container} from "tsyringe";
import {Connection, createConnection} from 'typeorm';


export default async () => {
  try {
     const database = await createConnection({
      type: 'postgres',
      host: config.get<string>('dbHost'),
      port: config.get<number>('dbPort'),
      username: config.get<string>('dbUser'),
      password: config.get<string>('dbPassword'),
      database: config.get<string>('dbName'),
      entities: [__dirname + "/../../entities/*.js", __dirname + "/../../entities/*.ts"],
      synchronize: true,
    });


    if (!database) {
      throw new Error('Failed to connect to database');
    }

    container.registerInstance<Connection>(Connection, database);

    return database;
  } catch (err) {
    console.log(err);
  }
}
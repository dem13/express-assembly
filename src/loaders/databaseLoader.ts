import {createConnection} from 'typeorm';


export default async () => {
  try {
    return await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'woter123123',
      database: 'med_express',
      entities: [__dirname + "/../entities/*.ts"],
      synchronize: true,
    });
  } catch (err) {
    console.log(err);
  }
}
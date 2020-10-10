import 'reflect-metadata';
import express, {Express} from "express";
import expressLoader from "./loaders/expressLoader";
import api from './routes/api';
import AppRouter from "./types/AppRouter";
import databaseLoader from "./loaders/databaseLoader";
import {container} from "tsyringe";
import {Connection} from 'typeorm';

class App {
  public server?: Express;

  async init() {
    this.server = express();

    const routers = this.getRouters();

    const database = await databaseLoader();

    if(!database) {
      throw new Error('Failed to connect to database');
    }

    container.registerInstance<Connection>(Connection,  database);

    expressLoader(this.server, routers);
  }

  getRouters(): Array<AppRouter> {
    return [
      {path: '/api', router: api},
    ]
  }
}

export default App;
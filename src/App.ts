import 'reflect-metadata';
import express, {Express} from "express";
import expressLoader from "./loaders/expressLoader";
import api from './routes/api';
import AppRouter from "./types/AppRouter";
import databaseLoader from "./loaders/databaseLoader";
import {container} from "tsyringe";
import {Connection} from 'typeorm';
import controllersLoader from "./loaders/controllersLoader";
import authLoader from "./loaders/authLoader";

class App {
  public server?: Express;

  async init() {
    this.server = express();

    await this.loadControllers();

    const database = await databaseLoader();

    if (!database) {
      throw new Error('Failed to connect to database');
    }

    container.registerInstance<Connection>(Connection, database);

    authLoader();
    expressLoader({
      express: this.server,
      routers: await this.getRouters(),
      useRoutingControllers: true
    });
  }

  async loadControllers() {
    container.register('controllers', {useValue: await controllersLoader()});
  }

  async getRouters(): Promise<Array<AppRouter>> {
    /** @todo Router auto import **/
    return [
      {path: '/api', router: await api()},
    ]
  }
}

export default App;
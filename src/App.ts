import 'reflect-metadata';
import express, {Express} from "express";
import expressLoader from "./loaders/expressLoader";
import api from './routes/api';
import AppRouter from "./types/AppRouter";
import databaseLoader from "./loaders/databaseLoader";
import {container} from "tsyringe";
import {Connection} from 'typeorm';
import controllersLoader from "./loaders/controllersLoader";
import ImportClass from "./types/ImportClass";
import ControllerResolver from "./core/controllers/ControllerResolver";


class App {
  public server?: Express;

  public controllers: Map<string, ImportClass>

  async init() {
    this.server = express();

    await this.loadControllers();

    const routers = await this.getRouters();

    const database = await databaseLoader();

    if(!database) {
      throw new Error('Failed to connect to database');
    }

    container.registerInstance<Connection>(Connection,  database);

    expressLoader(this.server, routers);
  }

  async loadControllers() {
    const controllerResolver = container.resolve(ControllerResolver);

    /** @todo Refactor **/
    const controllers = await controllersLoader();

    this.controllers = controllerResolver.resolveAll(controllers);

    container.register('controllers',{useValue: this.controllers});
  }

  async getRouters(): Promise<Array<AppRouter>> {
    /** @todo Router auto import **/
    return [
      {path: '/api', router: await api()},
    ]
  }
}

export default App;
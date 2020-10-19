import 'reflect-metadata';

import {container} from "tsyringe";
import express, {Express} from "express";

import api from './routes/api';
import AppRouter from "./core/types/AppRouter";
import authLoader from "./core/loaders/authLoader";
import expressLoader from "./core/loaders/expressLoader";
import databaseLoader from "./core/loaders/databaseLoader";
import controllersLoader from "./core/loaders/controllersLoader";
import dependenciesLoader from "./core/loaders/dependenciesLoader";

class App {
  public server?: Express;

  private loaders = [
    dependenciesLoader,
    databaseLoader,
    controllersLoader,
    authLoader,
    expressLoader
  ];

  async init() {
    this.server = express();

    container.registerInstance<Express>("Express", this.server);
    container.registerInstance<Array<AppRouter>>("routers", await this.getRouters());


    for (const loader of this.loaders) {
      await loader();
    }
  }

   getRouters(): Array<AppRouter> {
    /** @todo Router auto import **/
    return [
      {path: '/api', router: api},
    ]
  }
}

export default App;
import 'reflect-metadata';
import express, {Express} from "express";
import expressLoader from "./loaders/expressLoader";
import api from './routes/api';
import AppRouter from "./types/appRouter";

class App {
  public server?: Express;

  init() {
    this.server = express();

    const routers = this.getRouters();

    expressLoader(this.server, routers);
  }

  getRouters(): Array<AppRouter> {
    return [
      {path: '/api', router: api},
    ]
  }
}

export default App;
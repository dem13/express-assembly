import cors from "cors";
import config from "config";
import helmet from "helmet";
import morgan from "morgan";
import {Express} from "express";
import passport from "passport";
import {container} from "tsyringe";
import methodOverride from 'method-override';

import bodyParser from "body-parser";
import AppRouter from "../types/AppRouter";
import errorHandler from "../errors/errorHandler";
import routingControllersLoader from "./routingControllersLoader";

export default async () => {
  let app = container.resolve<Express>("Express");

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(methodOverride('_method'))
  app.use(passport.initialize());

  for (const router of container.resolve<Array<AppRouter>>("routers")) {
    app.use(router.path, await router.router());
  }

  if (config.get("app.useRoutingControllers")) {
    app = routingControllersLoader(app);
  }

  app.all('*', (req, res, next) => {
    if (config.get("app.useRoutingControllers") && res.headersSent) {
      return next();
    }

    res.status(404).send({
      message: 'Not found'
    });
  });

  app.use(errorHandler);
};
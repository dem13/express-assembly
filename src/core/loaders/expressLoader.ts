import {Express} from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from 'method-override';
import errorHandler from "../errors/errorHandler";
import AppRouter from "../types/AppRouter";
import passport from "passport";
import routingControllersLoader from "./routingControllersLoader";

export default (options: { express: Express, routers: Array<AppRouter>, useRoutingControllers?: boolean },) => {
  let app = options.express;

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(methodOverride('_method'))
  app.use(passport.initialize());

  options.routers.forEach((router: AppRouter) => app.use(router.path, router.router));

  if (options.useRoutingControllers) {
    app = routingControllersLoader(app);
  }

  app.all('*', (req, res, next) => {
    if (options.useRoutingControllers && res.headersSent) {
      return next();
    }

    res.status(404).send({
      message: 'Not found'
    });
  });

  app.use(errorHandler);
};
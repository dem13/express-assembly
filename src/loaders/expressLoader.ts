import {Express, Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from 'method-override';
import asyncHandler from "express-async-handler";
import errorHandler from "../errors/errorHandler";
import AppError from "../errors/AppError";
import config from 'config';
import TestController from "../controllers/TestController";
import resolve from "../helpers/resolve";
import AppRouter from "../types/AppRouter";
import {useExpressServer} from "routing-controllers";

export default (options: {express: Express, routers: Array<AppRouter>, useRoutingControllers?: boolean}, ) => {
  let app = options.express;

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(methodOverride('_method'))

  options.routers.forEach((router: AppRouter) => app.use(router.path, router.router));

  if(options.useRoutingControllers) {
    app = useExpressServer(app, {
      defaultErrorHandler: false,
      controllers: [__dirname + "/../controllers/*.js", __dirname + "/../controllers/*.ts"] // and configure it the way you need (controllers, validation, etc.)
    });
  }

  app.all('*', (req, res, next) => {
    res.status(404).send({
      message: 'Not found'
    });
  })

  app.use(errorHandler);
};
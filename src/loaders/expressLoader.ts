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

export default (app: Express, routers: Array<AppRouter>) => {

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(methodOverride('_method'))

  routers.forEach((router: AppRouter) => app.use(router.path, router.router));

  app.get('/', (req: Request, res: Response) => {
    res.send({
      message: 'Hello, world!',
      data: req.body,
      method: req.method,
      title: config.get('appName')
    });
  });

  app.get('/error', asyncHandler(async (req: Request, res: Response) => {
    throw new AppError('This is error', 400);
  }))

  app.get('/test', resolve(TestController).test);

  app.all('*', (req, res, next) => {
    res.status(404).send({
      message: 'Not found'
    });
  })

  app.use(errorHandler);
};
import {Request, Response} from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from 'method-override';
import asyncHandler from "express-async-handler";
import errorHandler from "../errors/errorHandler";
import AppError from "../errors/appError";
import LoaderOptions from "./loaderOptions";

export default (options: LoaderOptions) => {
  const app = options.express;

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(methodOverride('_method'))

  app.get('/', (req: Request, res: Response) => {
    res.send({
      message: 'Hello, world!',
      data: req.body,
      method: req.method,
    });
  });

  app.get('/error', asyncHandler(async (req: Request, res: Response) => {
    throw new AppError('This is error', 400);
  }))

  app.all('*', (req, res, next) => {
    res.status(404).send({
      message: 'Not found'
    });
  })

  app.use(errorHandler);
};
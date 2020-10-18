import {Express} from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import methodOverride from 'method-override';
import errorHandler from "../errors/errorHandler";
import AppRouter from "../types/AppRouter";
import {Action, useExpressServer} from "routing-controllers";
import passport from "passport";

export default (options: {express: Express, routers: Array<AppRouter>, useRoutingControllers?: boolean}, ) => {
  let app = options.express;

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  app.use(methodOverride('_method'))
  app.use(passport.initialize());

  options.routers.forEach((router: AppRouter) => app.use(router.path, router.router));

  if(options.useRoutingControllers) {
    app = useExpressServer(app, {
      authorizationChecker: (action: Action, roles: string[]) => {
        return new Promise<boolean>(((resolve, reject) => {
          passport.authenticate('bearer',{session: false}, (err, user, info) => {
            if(err) return reject(err);
            if(!user) return resolve(false);

            action.request.user = user;

            resolve(true);
          })(action.request, action.response, action.next);
        }));
      },
      currentUserChecker: (action:Action) => {
        return action.request.user
      },
      defaultErrorHandler: false,
      controllers: [__dirname + "/../controllers/*.js", __dirname + "/../controllers/*.ts"] // and configure it the way you need (controllers, validation, etc.)
    });
  }

  /**
   * @todo Fix bug: Get "Cannot set headers after they are then to the client"
   * error when using routing controllers
   */
  app.all('*', (req, res, next) => {
    res.status(404).send({
      message: 'Not found'
    });
  })

  app.use(errorHandler);
};
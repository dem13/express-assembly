import {Router} from "express";

type AppRouter = {
  path: string,
  router: () => Promise<Router>
}


export default AppRouter;

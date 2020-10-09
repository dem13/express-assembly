import express, {Express} from "express";
  import expressLoader from "./loaders/expressLoader";

class App {
  public server?: Express;

  init() {
    this.server = express();

    expressLoader(this.server);
  }
}

export default App;
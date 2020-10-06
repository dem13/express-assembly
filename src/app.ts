import express, {Express} from "express";
import Loader from './loaders/loader';

class App {
  public server?: Express;

  init() {
    this.server = express();

    const loader = new Loader({express: this.server});

    loader.run();
  }
}

export default App;
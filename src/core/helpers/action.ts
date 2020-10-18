import {container} from "tsyringe";
import ControllerResolver from "../controllers/ControllerResolver";

export default (key:string) => {
  return container.resolve(ControllerResolver).action(key);
}
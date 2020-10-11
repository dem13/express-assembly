import {container} from "tsyringe";
import ControllerResolver from "../core/controllers/ControllerResolver";

export default (key:string) => {
  return container.resolve(ControllerResolver).action(key);
}
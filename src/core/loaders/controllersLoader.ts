import {container} from "tsyringe";
import ControllerImporter from "../controllers/ControllerImporter";
import ControllerResolver from "../controllers/ControllerResolver";


export default async () => {
  const controllerImporter = container.resolve(ControllerImporter);
  const controllerResolver = container.resolve(ControllerResolver);

  return controllerResolver.resolveAll(await controllerImporter.load());
}
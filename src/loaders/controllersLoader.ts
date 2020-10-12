import {container} from "tsyringe";
import ControllerImporter from "../core/controllers/ControllerImporter";
import ControllerResolver from "../core/controllers/ControllerResolver";


export default async () => {
  const controllerImporter = container.resolve(ControllerImporter);
  const controllerResolver = container.resolve(ControllerResolver);

  return controllerResolver.resolveAll(await controllerImporter.load());
}
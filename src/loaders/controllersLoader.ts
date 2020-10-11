import {container} from "tsyringe";
import ControllerImporter from "../core/controllers/ControllerImporter";


export default async () => {
  const controllerImporter = container.resolve(ControllerImporter);

  return await controllerImporter.load();
}
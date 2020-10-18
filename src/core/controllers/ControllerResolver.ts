import {container} from "tsyringe";
import ImportClass from "../types/ImportClass";
import ControllersMap from "../types/ControllersMap";
import expressAsyncHandler from "express-async-handler";

/**
 * Resolve controllers and its actions from global ioc container
 */
class ControllerResolver {

  /**
   * Resolve all controllers and
   * store their instances in map
   *
   * @param controllers
   */
  resolveAll(controllers: ControllersMap) {
    controllers.forEach((controller, key) => {

      const newController = {...controller};

      newController.instance = this.resolve(controller.class);

      controllers.set(key, newController);
    });

    return controllers;
  }

  getMap(): ControllersMap {
    return container.resolve<ControllersMap>('controllers')
  }

  /**
   * Find controller in global container
   *
   * @param name
   */
  find(name: string): ImportClass {
    const controllers = this.getMap();

    const controllerClass = controllers.get(name);

    if (!controllerClass) {
      throw new Error(`Controller ${name} not found`);
    }

    return controllerClass;
  }

  /**
   * Resolve controller class from ioc container
   *
   * @param controllerClass
   */
  resolve(controllerClass: ImportClass) {
    return container.resolve<ImportClass>(controllerClass);
  }

  /**
   * Returns controller action
   *
   * @param controllerName
   * @param actionName
   */
  findAction(controllerName: string, actionName: string) {
    const controller = this.find(controllerName);

    let controllerInstance: any;

    if (controller.instance) {
      controllerInstance = controller.instance;
    } else {
      controllerInstance = this.resolve(controller.class);
    }

    if (!controllerInstance[actionName]) {
      throw new Error(`Action ${actionName} not found in controller ${controllerInstance}`);
    }

    return expressAsyncHandler(controllerInstance[actionName]);
  }

  /**
   * Prettier alias for findAction
   *
   * @param key
   */
  action(key: string) {
    const name = this.keyToControllerAndAction(key);

    if (!name.action) {
      throw new Error(`Invalid action name ${key}`);
    }

    return this.findAction(name.controller, name.action);
  }

  /**
   * Key example: Test/ExampleController.exampleAction
   *
   * @param key
   */
  keyToControllerAndAction(key: string) {
    const [controller, action] = key.split('.');

    return {controller, action};
  }
}

export default ControllerResolver;
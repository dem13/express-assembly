"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
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
    resolveAll(controllers) {
        controllers.forEach((controller, key) => {
            const newController = Object.assign({}, controller);
            newController.instance = this.resolve(controller.class);
            controllers.set(key, newController);
        });
        return controllers;
    }
    getMap() {
        return tsyringe_1.container.resolve('controllers');
    }
    /**
     * Find controller in global container
     *
     * @param name
     */
    find(name) {
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
    resolve(controllerClass) {
        return tsyringe_1.container.resolve(controllerClass);
    }
    /**
     * Returns controller action
     *
     * @param controllerName
     * @param actionName
     */
    findAction(controllerName, actionName) {
        const controller = this.find(controllerName);
        let controllerInstance;
        if (controller.instance) {
            controllerInstance = controller.instance;
        }
        else {
            controllerInstance = this.resolve(controller.class);
        }
        if (!controllerInstance[actionName]) {
            throw new Error(`Action ${actionName} not found in controller ${controllerInstance}`);
        }
        return controllerInstance[actionName];
    }
    /**
     * Prettier alias for findAction
     *
     * @param key
     */
    action(key) {
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
    keyToControllerAndAction(key) {
        const [controller, action] = key.split('.');
        return { controller, action };
    }
}
exports.default = ControllerResolver;

import {promises as fs} from "fs";
import ImportClass from "../../types/ImportClass";
import ControllersMap from "../../types/ControllersMap";

/**
 * This class imports controllers classes from specific
 * directory to map so they can be resolved later
 */
class ControllerImporter {
  private readonly extension = '.ts';
  private readonly divider = '/';
  private readonly dir = __dirname + '/../../controllers';

  /**
   * Creates hash map of controllers
   */
  public async load() {
    const controllers = new Map<string, {class: ImportClass, instance?: any}>();

    await this.loadFromDir(this.dir, controllers);

    return controllers;
  }

  /**
   * Load controllers classes from dir and put in map
   *
   * @param dir
   * @param controllers
   * @param prefix
   * @private
   */
  private async loadFromDir(dir: string, controllers: ControllersMap, prefix: string = '') {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const path = `${dir}/${file}`;

      const fileInfo = await fs.lstat(path);

      if (fileInfo.isDirectory()) {
        await this.loadFromDir(path, controllers, `${prefix}${file}${this.divider}`);
        continue;
      }

      const controller = await import(path);

      controllers.set(this.controllerFileToKey(file, prefix), {class: controller.default});
    }

    return controllers;
  }

  /**
   * Converts controller file name to map key
   *
   * @param file
   * @param prefix
   * @private
   */
  private controllerFileToKey(file: string, prefix: string = '') {
    return prefix + file.substr(0, file.indexOf(this.extension));
  }
}

export default ControllerImporter;
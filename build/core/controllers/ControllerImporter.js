"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
/**
 * This class imports controllers classes from specific
 * directory to map so they can be resolved later
 */
class ControllerImporter {
    constructor() {
        this.extension = '.ts';
        this.divider = '/';
        this.dir = __dirname + '/../../controllers';
    }
    /**
     * Creates hash map of controllers
     */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const controllers = new Map();
            yield this.loadFromDir(this.dir, controllers);
            return controllers;
        });
    }
    /**
     * Load controllers classes from dir and put in map
     *
     * @param dir
     * @param controllers
     * @param prefix
     * @private
     */
    loadFromDir(dir, controllers, prefix = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs_1.promises.readdir(dir);
            for (const file of files) {
                const path = `${dir}/${file}`;
                const fileInfo = yield fs_1.promises.lstat(path);
                if (fileInfo.isDirectory()) {
                    yield this.loadFromDir(path, controllers, `${prefix}${file}${this.divider}`);
                    continue;
                }
                const controller = yield Promise.resolve().then(() => __importStar(require(path)));
                controllers.set(this.controllerFileToKey(file, prefix), { class: controller.default });
            }
            return controllers;
        });
    }
    /**
     * Converts controller file name to map key
     *
     * @param file
     * @param prefix
     * @private
     */
    controllerFileToKey(file, prefix = '') {
        return prefix + file.substr(0, file.indexOf(this.extension));
    }
}
exports.default = ControllerImporter;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("config"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield typeorm_1.createConnection({
            type: 'postgres',
            host: config_1.default.get('dbHost'),
            port: config_1.default.get('dbPort'),
            username: config_1.default.get('dbUser'),
            password: config_1.default.get('dbPassword'),
            database: config_1.default.get('dbName'),
            entities: [__dirname + "/../entities/*.ts"],
            synchronize: true,
        });
    }
    catch (err) {
        console.log(err);
    }
});

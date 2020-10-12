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
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errorHandler_1 = __importDefault(require("../errors/errorHandler"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("config"));
const TestController_1 = __importDefault(require("../controllers/TestController"));
const resolve_1 = __importDefault(require("../helpers/resolve"));
const routing_controllers_1 = require("routing-controllers");
exports.default = (options) => {
    let app = options.express;
    app.use(helmet_1.default());
    app.use(morgan_1.default('combined'));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(cors_1.default());
    app.use(method_override_1.default('_method'));
    options.routers.forEach((router) => app.use(router.path, router.router));
    if (options.useRoutingControllers) {
        app = routing_controllers_1.useExpressServer(app, {
            defaultErrorHandler: false,
            controllers: [__dirname + "/../controllers/*.js", __dirname + "/../controllers/*.ts"] // and configure it the way you need (controllers, validation, etc.)
        });
    }
    app.get('/', (req, res) => {
        res.send({
            message: 'Hello, world!',
            data: req.body,
            method: req.method,
            title: config_1.default.get('appName')
        });
    });
    app.get('/error', express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        throw new AppError_1.default('This is error', 400);
    })));
    app.get('/test', resolve_1.default(TestController_1.default).test);
    app.all('*', (req, res, next) => {
        res.status(404).send({
            message: 'Not found'
        });
    });
    app.use(errorHandler_1.default);
};

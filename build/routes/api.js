"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resolve_1 = __importDefault(require("../helpers/resolve"));
const apiController_1 = __importDefault(require("../controllers/apiController"));
const authController_1 = __importDefault(require("../controllers/authController"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
const authController = resolve_1.default(authController_1.default);
router.get('/', resolve_1.default(apiController_1.default).index);
router.post('/auth/register', express_async_handler_1.default(authController.register));
exports.default = router;

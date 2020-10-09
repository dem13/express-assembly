"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resolve_1 = __importDefault(require("../helpers/resolve"));
const apiController_1 = __importDefault(require("../controllers/apiController"));
const router = express_1.default.Router();
router.get('/', resolve_1.default(apiController_1.default).index);
exports.default = router;

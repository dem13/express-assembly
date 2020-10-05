"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(helmet_1.default());
app.use(morgan_1.default('combined'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.get('/', (req, res) => {
    res.send({
        message: 'Hello, world!',
        data: req.body,
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("config"));
const port = config_1.default.get('port');
const app = new app_1.default();
app.init().then(() => {
    const server = http_1.default.createServer(app.server);
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

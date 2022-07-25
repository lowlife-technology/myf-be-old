"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./src/identity/controller/login"));
const register_1 = __importDefault(require("./src/identity/controller/register"));
const controller_1 = __importDefault(require("./src/categories/controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(login_1.default);
app.use(register_1.default);
app.use(controller_1.default);
app.get('/', (_, res) => {
    res.status(200).send({
        message: 'runing!',
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

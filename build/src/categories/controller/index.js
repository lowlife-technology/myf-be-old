"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Create_1 = __importDefault(require("./Create"));
const Delete_1 = __importDefault(require("./Delete"));
const Get_1 = __importDefault(require("./Get"));
const List_1 = __importDefault(require("./List"));
const Update_1 = __importDefault(require("./Update"));
const router = express_1.default.Router();
router.post('/category', Create_1.default);
router.delete('/category/:id', Delete_1.default);
router.get('/category/:id', Get_1.default);
router.get('/category', List_1.default);
router.put('/category/:id', Update_1.default);
exports.default = router;

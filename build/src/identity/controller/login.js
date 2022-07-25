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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/identity/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({
            message: 'Missing required fields',
            status: 'error',
        });
        return;
    }
    try {
        const foundUser = yield prisma.identity.findUnique({
            where: { email },
        });
        if (foundUser) {
            const validPassword = yield bcrypt_1.default.compare(password, foundUser.password);
            if (validPassword) {
                // todo: generate a token that expires!
                const token = jsonwebtoken_1.default.sign({ email }, 'qualquer');
                res.status(201).send({
                    message: '',
                    status: 'success',
                    data: {
                        token: `Bearer ${token}`,
                    },
                });
            }
        }
    }
    catch (error) {
        res.status(404).send({
            message: 'User not found',
            status: 'error',
        });
    }
}));
exports.default = router;

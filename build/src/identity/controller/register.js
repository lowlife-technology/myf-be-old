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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
// todo: create a type interface for res
router.post('/identity/register', (req, res) => {
    // todo: create validations
    if (!req.body.email || !req.body.password || !req.body.fullName) {
        res.status(400).send({
            message: 'Missing required fields',
            status: 'error',
        });
        return;
    }
    // todo: change this to postgress when its configured.
    bcrypt_1.default.hash(req.body.password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield prisma.identity.create({
                data: {
                    password: hash,
                    email: req.body.email,
                    fullName: req.body.fullName,
                },
            });
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }));
    res.status(200).send();
});
exports.default = router;

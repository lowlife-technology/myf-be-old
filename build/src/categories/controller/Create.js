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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, projectedAmount, autoInsert, description, balanceType, } = req.body;
    if (!name || !balanceType) {
        res.status(400).send({
            message: 'Missing required fields',
            status: 'error',
        });
        return;
    }
    if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
        res.status(400).send({
            message: 'Invalid type',
            status: 'error',
        });
        return;
    }
    // todo: make a better logic to validate it.
    if (typeof autoInsert !== 'boolean' || typeof projectedAmount !== 'number' || typeof description !== 'string') {
        res.status(400).send({
            message: 'Invalid value',
            status: 'error',
        });
        return;
    }
    try {
        const isValidName = yield prisma.category.findUnique({
            where: {
                name,
            },
        });
        if (isValidName) {
            res.status(400).send({
                message: 'Category already exists',
                status: 'error',
            });
            return;
        }
        const category = yield prisma.category.create({
            data: {
                name,
                projectedAmount,
                autoInsert,
                description,
                balanceType,
            },
        });
        if (!category) {
            res.status(500).send({
                message: 'Couldn\'t create category.',
                status: 'error',
            });
            return;
        }
        res.status(200).send();
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            status: 'error',
        });
    }
});

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
    const { balanceType } = req.query;
    if (!balanceType) {
        try {
            const categories = yield prisma.category.findMany();
            if (categories.length === 0) {
                res.status(400).send({
                    message: 'Category not found',
                    status: 'error',
                });
                return;
            }
            res.status(200).send(categories);
        }
        catch (error) {
            res.status(500).send({
                message: 'Internal server error',
                status: 'error',
            });
        }
        return;
    }
    const [firstQueryKey] = Object.keys(req.query);
    if (firstQueryKey !== 'balanceType') {
        res.status(400).send({
            message: `${firstQueryKey} is not a valid key. Valid key is balanceType`,
            status: 'error',
        });
        return;
    }
    if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
        res.status(400).send({
            message: `Invalid query param ${balanceType} provided. Valid params are: INCOME or EXPENSE`,
            status: 'error',
        });
        return;
    }
    try {
        const categories = yield prisma.category.findMany({
            where: {
                balanceType,
            },
        });
        if (categories.length === 0) {
            res.status(400).send({
                message: `Category with balanceType ${balanceType} was not found`,
                status: 'error',
            });
            return;
        }
        res.status(200).send(categories);
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            status: 'error',
        });
    }
});

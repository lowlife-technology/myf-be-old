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
    const { params: { id }, body: { name, projectedAmount, description, balanceType, }, } = req;
    console.log(id);
    if (!name || !balanceType || !projectedAmount || !description) {
        res.status(400).send({
            message: 'Missing required fields',
            status: 'error',
        });
        return;
    }
    if (typeof name !== 'string'
        || typeof balanceType !== 'string'
        || typeof projectedAmount !== 'number'
        || typeof description !== 'string') {
        res.status(400).send({
            message: 'Field wrong value type',
            status: 'error',
        });
    }
    if (balanceType !== 'INCOME' && balanceType !== 'EXPENSE') {
        res.status(400).send({
            message: `${balanceType} is not assinged to type : INCOME | EXPENSE`,
            status: 'error',
        });
    }
    if (!id) {
        res.status(400).send({
            message: 'Missing required id',
            status: 'error',
        });
        return;
    }
    try {
        const upDateCategory = yield prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
                projectedAmount,
                description,
                balanceType,
            },
        });
        if (upDateCategory) {
            res.status(200).send();
            return;
        }
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            status: 'error',
        });
    }
});

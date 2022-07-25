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
    const { id } = req.params;
    console.log('get', req);
    if (!id) {
        res.status(400).send({
            message: 'Missing required id',
            status: 'error',
        });
        return;
    }
    try {
        const getSingleCategory = yield prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!getSingleCategory) {
            res.status(400).send({
                message: 'Category not found',
                status: 'error',
            });
            return;
        }
        res.status(200).send(getSingleCategory);
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            status: 'error',
        });
    }
});

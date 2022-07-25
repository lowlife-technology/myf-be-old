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
    const isIdValid = yield prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (isIdValid === null) {
        res.status(400).send({
            message: 'Category not founded | deleted | empyt field',
            status: 'error',
        });
        return;
    }
    try {
        const deleteCategory = yield prisma.category.delete({
            where: {
                id,
            },
        });
        if (deleteCategory) {
            res.status(201).send({
                message: 'Category deleted',
                status: 'success',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            status: 'error',
        });
    }
    res.status(200);
});

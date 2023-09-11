"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Valid email address is required",
        },
    },
    password: {
        in: ["body"],
        errorMessage: "Password must be at least 8 characters long",
        isLength: { options: { min: 8 } },
    },
});
exports.registerValidator = (0, express_validator_1.checkSchema)({
    email: {
        in: ["body"],
        isEmail: {
            errorMessage: "Valid email address is required",
        },
        trim: true,
    },
    password: {
        in: ["body"],
        errorMessage: "Password must be at least 8 characters long",
        isLength: { options: { min: 8 } },
    },
    firstname: {
        in: ["body"],
        errorMessage: "Please provide your first name",
        exists: true,
        trim: true,
    },
    lastname: {
        in: ["body"],
        errorMessage: "Please provide your last name",
        exists: true,
        trim: true,
    },
});

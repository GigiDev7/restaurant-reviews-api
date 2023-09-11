"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidator = void 0;
const express_validator_1 = require("express-validator");
exports.reviewValidator = (0, express_validator_1.checkSchema)({
    comment: {
        in: ["body"],
        errorMessage: "Please enter a comment for review",
        exists: true,
        trim: true,
    },
    rating: {
        in: ["body"],
        isFloat: {
            errorMessage: "Please enter a rating between 1 and 5",
            options: { min: 1, max: 5 },
        },
    },
    date: {
        isDate: {
            errorMessage: "Please provide a valid date",
        },
    },
    restaurantId: {
        isMongoId: {
            errorMessage: "Please provide a valid restaurant id",
        },
    },
});

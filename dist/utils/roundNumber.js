"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundNum = void 0;
const roundNum = (num) => {
    return Math.round((num + Number.EPSILON) * 10) / 10;
};
exports.roundNum = roundNum;

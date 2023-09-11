"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors;
(function (Errors) {
    Errors["AuthenticationError"] = "Authentication Error";
    Errors["AuthorizationError"] = "Authorization Error";
    Errors["NotFoundError"] = "Not Found Error";
    Errors["InvalidCredentialsError"] = "Invalid Credentials Error";
    Errors["UserExistsError"] = "User Exists Error";
})(Errors || (Errors = {}));
exports.default = Errors;

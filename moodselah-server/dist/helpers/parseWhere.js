"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var json5_1 = __importDefault(require("json5"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var isObject_1 = __importDefault(require("lodash/isObject"));
var typeorm_1 = require("typeorm");
var OPERATORS = {
    lt: typeorm_1.LessThan,
    gt: typeorm_1.MoreThan,
    not: typeorm_1.Not,
    like: typeorm_1.Like,
    in: typeorm_1.In,
    between: typeorm_1.Between
};
var matchOperators = function (obj) {
    var data = {};
    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (!isArray_1.default(value) && isObject_1.default(value)) {
            data[key] = matchOperators(value);
            return;
        }
        var matches = key.match(/(.+)\_(.+)/);
        if (!matches || matches.length !== 3) {
            data[key] = value;
            return;
        }
        var column = matches[1];
        var operator = matches[2];
        switch (operator) {
            case "between":
                data[column] = OPERATORS[operator](value[0], value[1]);
                break;
            default:
                data[column] = OPERATORS[operator](value);
                break;
        }
    });
    return data;
};
exports.parseWhereString = function (where) {
    try {
        var json = json5_1.default.parse(where);
        return matchOperators(json);
    }
    catch (error) {
        return undefined;
    }
};
exports.parseWhere = function (where) {
    if (typeof where === "string") {
        return exports.parseWhereString(where);
    }
    if (isObject_1.default(where)) {
        var whereObj = {};
        if (typeof where.where === "string") {
            try {
                whereObj = json5_1.default.parse(where.where);
                delete where.where;
            }
            catch (error) {
                // nothing todo
            }
        }
        whereObj = __assign({}, whereObj, where);
        return matchOperators(whereObj);
    }
    return undefined;
};
exports.default = exports.parseWhere;
//# sourceMappingURL=parseWhere.js.map
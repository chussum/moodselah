"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../../../entities/User"));
var cleanNullArg_1 = __importDefault(require("../../../helpers/cleanNullArg"));
var privateResolver_1 = __importDefault(require("../../../helpers/privateResolver"));
var processUpload_1 = __importStar(require("../../../helpers/processUpload"));
var generateError = function (message) { return ({
    success: false,
    error: message,
    user: null
}); };
var passingProfileUploadedFile = function (file) {
    if (file) {
        return processUpload_1.passingUpload(file);
    }
    return null;
};
var resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolver_1.default(function (_, args, _a) {
            var req = _a.req;
            return __awaiter(_this, void 0, void 0, function () {
                var user, notNull, existingUserOfEmail, existingUserOfNick, file, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = req.user;
                            notNull = cleanNullArg_1.default(args);
                            if (!notNull.email) return [3 /*break*/, 3];
                            return [4 /*yield*/, User_1.default.findOne({
                                    email: notNull.email
                                })];
                        case 1:
                            existingUserOfEmail = _b.sent();
                            if (!(existingUserOfEmail && existingUserOfEmail.id !== user.id)) return [3 /*break*/, 3];
                            return [4 /*yield*/, passingProfileUploadedFile(notNull.profileFile)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, generateError("이미 존재하는 이메일입니다.")];
                        case 3:
                            if (!notNull.nick) return [3 /*break*/, 6];
                            return [4 /*yield*/, User_1.default.findOne({ nick: notNull.nick })];
                        case 4:
                            existingUserOfNick = _b.sent();
                            if (!(existingUserOfNick && existingUserOfNick.id !== user.id)) return [3 /*break*/, 6];
                            return [4 /*yield*/, passingProfileUploadedFile(notNull.profileFile)];
                        case 5:
                            _b.sent();
                            return [2 /*return*/, generateError("이미 존재하는 닉네임입니다.")];
                        case 6:
                            if (!notNull.password) return [3 /*break*/, 9];
                            if (!(notNull.password !== notNull.confirmPassword)) return [3 /*break*/, 8];
                            return [4 /*yield*/, passingProfileUploadedFile(notNull.profileFile)];
                        case 7:
                            _b.sent();
                            return [2 /*return*/, generateError("비밀번호를 확인해주세요.")];
                        case 8:
                            user.password = notNull.password;
                            user.save();
                            delete notNull.password;
                            delete notNull.confirmPassword;
                            _b.label = 9;
                        case 9:
                            if (!notNull.profileFile) return [3 /*break*/, 11];
                            return [4 /*yield*/, processUpload_1.default(notNull.profileFile, "avatar/" + user.id)];
                        case 10:
                            file = _b.sent();
                            notNull._profilePhoto = file.path;
                            delete notNull.profileFile;
                            _b.label = 11;
                        case 11:
                            _b.trys.push([11, 13, , 15]);
                            return [4 /*yield*/, User_1.default.update({ id: user.id }, __assign({}, notNull))];
                        case 12:
                            _b.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    error: null
                                }];
                        case 13:
                            error_1 = _b.sent();
                            return [4 /*yield*/, passingProfileUploadedFile(args.profileFile)];
                        case 14:
                            _b.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_1.message
                                }];
                        case 15: return [2 /*return*/];
                    }
                });
            });
        })
    }
};
exports.default = resolvers;
//# sourceMappingURL=UpdateMyProfile.resolvers.js.map
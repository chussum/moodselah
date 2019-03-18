"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../../../entities/User"));
var Verification_1 = __importDefault(require("../../../entities/Verification"));
var createJWT_1 = __importDefault(require("../../../helpers/createJWT"));
var resolvers = {
    Mutation: {
        CompletePhoneVerification: function (_, args) { return __awaiter(_this, void 0, void 0, function () {
            var phoneNumber, key, verification, error_1, user, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phoneNumber = args.phoneNumber, key = args.key;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Verification_1.default.findOne({
                                payload: phoneNumber,
                                key: key
                            })];
                    case 2:
                        verification = _a.sent();
                        if (!verification) {
                            return [2 /*return*/, {
                                    success: false,
                                    error: "'Verification key'가 존재하지 않습니다.",
                                    token: null
                                }];
                        }
                        else {
                            verification.verified = true;
                            verification.save();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_1.message,
                                token: null
                            }];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, User_1.default.findOne({ phoneNumber: phoneNumber })];
                    case 5:
                        user = _a.sent();
                        if (user) {
                            user.verifiedPhoneNumber = true;
                            user.save();
                            token = createJWT_1.default(user.id);
                            return [2 /*return*/, {
                                    success: true,
                                    error: null,
                                    token: token
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: true,
                                    error: null,
                                    token: null
                                }];
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: error_2.message,
                                token: null
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        }); }
    }
};
exports.default = resolvers;
//# sourceMappingURL=CompletePhoneVerification.resolvers.js.map
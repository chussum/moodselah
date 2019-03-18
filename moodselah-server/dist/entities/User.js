"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var Chat_1 = __importDefault(require("./Chat"));
var Megazine_1 = __importDefault(require("./Megazine"));
var Message_1 = __importDefault(require("./Message"));
var Place_1 = __importDefault(require("./Place"));
var Post_1 = __importDefault(require("./Post"));
var BCRYPT_ROUNDS = 10;
var USER_ROLE = {
    USER: "USER",
    ADMIN: "ADMIN",
    DEVELOPER: "DEVELOPER"
};
var UPLOAD_FILE_PATH = process.env.UPLOAD_FILE_PATH;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_1 = User;
    Object.defineProperty(User.prototype, "profilePhoto", {
        get: function () {
            return ("" + this._profilePhoto).replace(UPLOAD_FILE_PATH, "/images");
        },
        set: function (path) {
            this._profilePhoto = path;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.comparePassword = function (password) {
        return bcrypt_1.default.compare(password, this.password);
    };
    User.prototype.savePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.password) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.hashPassword(this.password)];
                    case 1:
                        hashedPassword = _a.sent();
                        this.password = hashedPassword;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.updateFollowerCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.follower && this.follower.length) {
                    this.followerCount = this.follower.length;
                }
                return [2 /*return*/];
            });
        });
    };
    User.prototype.updateFollowingCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.following && this.following.length) {
                    this.followingCount = this.following.length;
                }
                return [2 /*return*/];
            });
        });
    };
    User.prototype.hashPassword = function (password) {
        return bcrypt_1.default.hash(password, BCRYPT_ROUNDS);
    };
    var User_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: [USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.DEVELOPER],
            default: USER_ROLE.USER
        }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", nullable: true }),
        class_validator_1.IsEmail(),
        __metadata("design:type", Object)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "verifiedEmail", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 24 }),
        __metadata("design:type", String)
    ], User.prototype, "nick", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "phoneNumber", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "verifiedPhoneNumber", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", name: "profilePhoto" }),
        __metadata("design:type", String)
    ], User.prototype, "_profilePhoto", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "fbId", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Chat_1.default; }, function (chat) { return chat.receiver; }),
        __metadata("design:type", Array)
    ], User.prototype, "chatsAsReceiver", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Chat_1.default; }, function (chat) { return chat.sender; }),
        __metadata("design:type", Array)
    ], User.prototype, "chatsAsSender", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Message_1.default; }, function (message) { return message.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "messages", void 0);
    __decorate([
        typeorm_1.Column({ type: "bigint", default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "followingCount", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1; }, function (user) { return user.follower; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], User.prototype, "following", void 0);
    __decorate([
        typeorm_1.Column({ type: "bigint", default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "followerCount", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1; }, function (user) { return user.following; }),
        __metadata("design:type", Array)
    ], User.prototype, "follower", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Place_1.default; }, function (place) { return place.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "places", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Post_1.default; }, function (post) { return post.author; }),
        __metadata("design:type", Array)
    ], User.prototype, "posts", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Megazine_1.default; }, function (megazine) { return megazine.author; }),
        __metadata("design:type", Array)
    ], User.prototype, "megazines", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Post_1.default; }, function (post) { return post.likes; }),
        __metadata("design:type", Array)
    ], User.prototype, "likePosts", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Megazine_1.default; }, function (megazine) { return megazine.likes; }),
        __metadata("design:type", Array)
    ], User.prototype, "likeMegazines", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], User.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "savePassword", null);
    __decorate([
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "updateFollowerCount", null);
    __decorate([
        typeorm_1.BeforeUpdate(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "updateFollowingCount", null);
    User = User_1 = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.default = User;
//# sourceMappingURL=User.js.map
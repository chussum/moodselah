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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Message_1 = __importDefault(require("./Message"));
var User_1 = __importDefault(require("./User"));
var Chat = /** @class */ (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Chat.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Message_1.default; }, function (message) { return message.chat; }, { nullable: true }),
        __metadata("design:type", Array)
    ], Chat.prototype, "messages", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Chat.prototype, "senderId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.chatsAsSender; }),
        __metadata("design:type", User_1.default)
    ], Chat.prototype, "sender", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Chat.prototype, "receiverId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.chatsAsReceiver; }),
        __metadata("design:type", User_1.default)
    ], Chat.prototype, "receiver", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Chat.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Chat.prototype, "updatedAt", void 0);
    Chat = __decorate([
        typeorm_1.Entity()
    ], Chat);
    return Chat;
}(typeorm_1.BaseEntity));
exports.default = Chat;
//# sourceMappingURL=Chat.js.map
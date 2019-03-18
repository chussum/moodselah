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
var User_1 = __importDefault(require("./User"));
var Place_1 = __importDefault(require("./Place"));
var Photo_1 = __importDefault(require("./Photo"));
var Comment_1 = __importDefault(require("./Comment"));
var Megazine = /** @class */ (function (_super) {
    __extends(Megazine, _super);
    function Megazine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Megazine.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Megazine.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Megazine.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Megazine.prototype, "placeId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Place_1.default; }, function (place) { return place.megazines; }),
        __metadata("design:type", Place_1.default)
    ], Megazine.prototype, "place", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Photo_1.default; }, function (photo) { return photo.post; }),
        __metadata("design:type", Array)
    ], Megazine.prototype, "photos", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Comment_1.default; }, function (comment) { return comment.megazine; }),
        __metadata("design:type", Array)
    ], Megazine.prototype, "comments", void 0);
    __decorate([
        typeorm_1.Column({ type: "bigint", default: 0 }),
        __metadata("design:type", Number)
    ], Megazine.prototype, "hit", void 0);
    __decorate([
        typeorm_1.Column({ type: "bigint", default: 0 }),
        __metadata("design:type", Number)
    ], Megazine.prototype, "likeCount", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1.default; }, function (user) { return user.likeMegazines; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Megazine.prototype, "likes", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Megazine.prototype, "authorId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.megazines; }),
        __metadata("design:type", User_1.default)
    ], Megazine.prototype, "author", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Megazine.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Megazine.prototype, "updatedAt", void 0);
    Megazine = __decorate([
        typeorm_1.Entity()
    ], Megazine);
    return Megazine;
}(typeorm_1.BaseEntity));
exports.default = Megazine;
//# sourceMappingURL=Megazine.js.map
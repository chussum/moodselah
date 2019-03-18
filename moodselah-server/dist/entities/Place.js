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
var Post_1 = __importDefault(require("./Post"));
var Megazine_1 = __importDefault(require("./Megazine"));
var Place = /** @class */ (function (_super) {
    __extends(Place, _super);
    function Place() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Place.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Place.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: "double", default: 0 }),
        __metadata("design:type", Number)
    ], Place.prototype, "lat", void 0);
    __decorate([
        typeorm_1.Column({ type: "double", default: 0 }),
        __metadata("design:type", Number)
    ], Place.prototype, "lng", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Place.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Place.prototype, "isFav", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Post_1.default; }, function (post) { return post.place; }),
        __metadata("design:type", Array)
    ], Place.prototype, "posts", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Megazine_1.default; }, function (megazine) { return megazine.place; }),
        __metadata("design:type", Array)
    ], Place.prototype, "megazines", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Place.prototype, "userId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.places; }),
        __metadata("design:type", User_1.default)
    ], Place.prototype, "user", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Place.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Place.prototype, "updatedAt", void 0);
    Place = __decorate([
        typeorm_1.Entity()
    ], Place);
    return Place;
}(typeorm_1.BaseEntity));
exports.default = Place;
//# sourceMappingURL=Place.js.map
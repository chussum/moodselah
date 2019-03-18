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
var Megazine_1 = __importDefault(require("./Megazine"));
var Post_1 = __importDefault(require("./Post"));
var User_1 = __importDefault(require("./User"));
var UPLOAD_FILE_PATH = process.env.UPLOAD_FILE_PATH;
var Photo = /** @class */ (function (_super) {
    __extends(Photo, _super);
    function Photo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Photo.prototype, "path", {
        get: function () {
            return ("" + this._path).replace(UPLOAD_FILE_PATH, "/images");
        },
        set: function (path) {
            this._path = path;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Photo.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "text" }),
        __metadata("design:type", String)
    ], Photo.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, type: "text" }),
        __metadata("design:type", String)
    ], Photo.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ type: "text", name: "path" }),
        __metadata("design:type", String)
    ], Photo.prototype, "_path", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Photo.prototype, "postId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Post_1.default; }, function (post) { return post.photos; }, {
            cascade: true,
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Post_1.default)
    ], Photo.prototype, "post", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Photo.prototype, "megazineId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Megazine_1.default; }, function (megazine) { return megazine.photos; }, {
            cascade: true,
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Megazine_1.default)
    ], Photo.prototype, "megazine", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Photo.prototype, "authorId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.posts; }),
        __metadata("design:type", User_1.default)
    ], Photo.prototype, "author", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Photo.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Photo.prototype, "updatedAt", void 0);
    Photo = __decorate([
        typeorm_1.Entity()
    ], Photo);
    return Photo;
}(typeorm_1.BaseEntity));
exports.default = Photo;
//# sourceMappingURL=Photo.js.map
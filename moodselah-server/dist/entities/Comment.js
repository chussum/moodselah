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
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comment_1 = Comment;
    var Comment_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Comment.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Comment.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Comment.prototype, "postId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Post_1.default; }, function (post) { return post.comments; }, {
            cascade: true,
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Post_1.default)
    ], Comment.prototype, "post", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Comment.prototype, "megazineId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Megazine_1.default; }, function (megazine) { return megazine.comments; }, {
            cascade: true,
            onDelete: "CASCADE"
        }),
        __metadata("design:type", Megazine_1.default)
    ], Comment.prototype, "megazine", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Comment.prototype, "parentId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Comment_1; }, function (comment) { return comment.childs; }),
        __metadata("design:type", Comment)
    ], Comment.prototype, "parent", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Comment_1; }, function (comment) { return comment.parent; }),
        __metadata("design:type", Array)
    ], Comment.prototype, "childs", void 0);
    __decorate([
        typeorm_1.Column({ type: "bigint", default: 0 }),
        __metadata("design:type", Number)
    ], Comment.prototype, "likeCount", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1.default; }, function (user) { return user.likePosts; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Comment.prototype, "likes", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Comment.prototype, "authorId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.posts; }),
        __metadata("design:type", User_1.default)
    ], Comment.prototype, "author", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Comment.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Comment.prototype, "updatedAt", void 0);
    Comment = Comment_1 = __decorate([
        typeorm_1.Entity()
    ], Comment);
    return Comment;
}(typeorm_1.BaseEntity));
exports.default = Comment;
//# sourceMappingURL=Comment.js.map
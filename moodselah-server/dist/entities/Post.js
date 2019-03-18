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
var Comment_1 = __importDefault(require("./Comment"));
var Photo_1 = __importDefault(require("./Photo"));
var Place_1 = __importDefault(require("./Place"));
var User_1 = __importDefault(require("./User"));
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Post.prototype, "isLiked", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Post.prototype.checkIsLiked = function (userId) {
        return User_1.default.createQueryBuilder("user")
            .leftJoinAndSelect("user.likePosts", "likePosts")
            .leftJoinAndSelect("likePosts.likes", "likeUsers")
            .where("likePosts.id = :postId and likeUsers.id = :userId", {
            postId: this.id,
            userId: userId
        })
            .getOne()
            .then(function (res) { return !!res; });
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: "text" }),
        __metadata("design:type", String)
    ], Post.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, default: 0 }),
        __metadata("design:type", Number)
    ], Post.prototype, "wifi", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, default: 0 }),
        __metadata("design:type", Number)
    ], Post.prototype, "childChair", void 0);
    __decorate([
        typeorm_1.Column({ nullable: false, default: 0 }),
        __metadata("design:type", Number)
    ], Post.prototype, "study", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Post.prototype, "placeId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Place_1.default; }, function (place) { return place.posts; }),
        __metadata("design:type", Place_1.default)
    ], Post.prototype, "place", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Photo_1.default; }, function (photo) { return photo.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "photos", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Comment_1.default; }, function (comment) { return comment.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "comments", void 0);
    __decorate([
        typeorm_1.Column({ type: "bigint", default: 0 }),
        __metadata("design:type", Number)
    ], Post.prototype, "hit", void 0);
    __decorate([
        typeorm_1.Column({ type: "bigint", default: 0 }),
        __metadata("design:type", Number)
    ], Post.prototype, "likeCount", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1.default; }, function (user) { return user.likePosts; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Post.prototype, "likes", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Post.prototype, "authorId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.posts; }),
        __metadata("design:type", User_1.default)
    ], Post.prototype, "author", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", String)
    ], Post.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", String)
    ], Post.prototype, "updatedAt", void 0);
    Post = __decorate([
        typeorm_1.Entity()
    ], Post);
    return Post;
}(typeorm_1.BaseEntity));
exports.default = Post;
//# sourceMappingURL=Post.js.map
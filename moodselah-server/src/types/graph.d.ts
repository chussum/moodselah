export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  senderId: Int\n  sender: User!\n  receiverId: Int!\n  receiver: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chatId: Int\n  chat: Chat!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetChatResponse {\n  success: Boolean!\n  error: String\n  chat: Chat\n}\n\ntype Query {\n  GetChat(chatId: Int!): GetChatResponse!\n  GetMyPlaces(skip: Int, limit: Int): GetMyPlacesResponse!\n  GetPlaces(lat: Float!, lng: Float!, where: String): GetPlacesResponse!\n  GetPost(id: Int!): GetPostResponse!\n  GetPostLikeUsers(id: Int!, skip: Int, limit: Int): GetPostLikeUsersResponse!\n  GetPosts(skip: Int, limit: Int, order: String, where: String): GetPostsResponse!\n  GetFollower(userId: Int!, skip: Int, limit: Int): GetFollowerResponse!\n  GetFollowing(userId: Int!, skip: Int, limit: Int): GetFollowingResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetUser(id: Int!): GetUserResponse!\n  GetUserByNick(nick: String!): GetUserResponse!\n}\n\ntype Subscription {\n  MessageSubscription: Message\n}\n\ntype SendChatMessageResponse {\n  success: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendChatMessage(text: String!, chatId: Int!): SendChatMessageResponse!\n  MultipleUpload(files: [Upload!]!): MultipleUploadResponse!\n  SingleUpload(file: Upload!): SingleUploadResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isFav: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(placeId: Int!, name: String, isFav: Boolean): EditPlaceResponse!\n  AddPost(content: String, files: [Upload!]!, wifi: Int!, childChair: Int!, study: Int!, address: String, lat: Float, lng: Float): AddPostResponse!\n  DeletePost(id: Int!): DeletePostResponse!\n  EditPost(id: Int!, content: String!, wifi: Int!, childChair: Int!, study: Int!, address: String, lat: Float, lng: Float): EditPostResponse!\n  TogglePostLike(id: Int!): TogglePostLikeResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(email: String!, password: String!, confirmPassword: String!, nick: String!, profilePhoto: String, phoneNumber: String): EmailSignUpResponse!\n  FacebookConnect(email: String, nick: String!, fbId: String!): FacebookConnectResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  ToggleUserFollow(userId: Int!): ToggleUserFollowResponse!\n  UpdateMyProfile(nick: String, email: String, password: String, confirmPassword: String, profilePhoto: String, profileFile: Upload, phoneNumber: String): UpdateMyProfileResponse!\n}\n\ntype Comment {\n  id: Int!\n  content: String!\n  postId: Int\n  post: Post\n  megazineId: Int\n  megazine: Megazine\n  parentId: Int\n  parent: Comment\n  childs: [Comment]\n  likeCount: Int\n  authorId: Int!\n  author: User!\n  createdAt: String!\n  updatedAt: String\n}\n\nscalar Upload\n\ntype File {\n  id: ID!\n  path: String!\n  filename: String!\n  mimetype: String!\n  encoding: String!\n}\n\ntype MultipleUploadResponse {\n  success: Boolean!\n  error: String\n  files: [File]\n}\n\ntype SingleUploadResponse {\n  success: Boolean!\n  error: String\n  file: File\n}\n\ntype Megazine {\n  id: Int!\n  title: String!\n  content: String!\n  photos: [Photo]\n  placeId: Int\n  place: Place\n  hit: Int!\n  likes: [User]\n  authorId: Int!\n  author: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Photo {\n  id: Int!\n  title: String\n  content: String\n  path: String!\n  postId: Int\n  post: Post\n  megazineId: Int\n  megazine: Megazine\n  authorId: Int!\n  author: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Place {\n  id: Int!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  posts: [Post]\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPlaceResponse {\n  success: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  success: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  success: Boolean!\n  error: String\n}\n\ntype GetMyPlacesResponse {\n  success: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype GetPlacesResponse {\n  success: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Post {\n  id: Int!\n  title: String!\n  content: String!\n  wifi: Int!\n  childChair: Int!\n  study: Int!\n  photos: [Photo]\n  placeId: Int\n  place: Place\n  hit: Int!\n  isLiked: Boolean\n  likeCount: Int!\n  authorId: Int!\n  author: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPostResponse {\n  success: Boolean!\n  error: String\n  post: Post\n}\n\ntype DeletePostResponse {\n  success: Boolean!\n  error: String\n}\n\ntype EditPostResponse {\n  success: Boolean!\n  error: String\n  post: Post\n}\n\ntype GetPostResponse {\n  success: Boolean!\n  error: String\n  post: Post\n}\n\ntype GetPostLikeUsersResponse {\n  success: Boolean!\n  error: String\n  users: [User]\n}\n\ntype GetPostsResponse {\n  success: Boolean!\n  error: String\n  posts: [Post]\n  hasNext: Boolean!\n}\n\ntype TogglePostLikeResponse {\n  success: Boolean!\n  error: String\n  isLiked: Boolean\n}\n\ntype User {\n  id: Int!\n  email: String\n  nick: String!\n  phoneNumber: String\n  profilePhoto: String\n  fbId: String\n  places: [Place]\n  posts: [Post]\n  megazines: [Megazine]\n  followingCount: Int!\n  followerCount: Int!\n  verifiedEmail: Boolean!\n  verifiedPhoneNumber: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CompleteEmailVerificationResponse {\n  success: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  success: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  success: Boolean!\n  error: String\n  token: String\n  user: User\n}\n\ntype EmailSignUpResponse {\n  success: Boolean!\n  error: String\n  token: String\n  user: User\n}\n\ntype FacebookConnectResponse {\n  success: Boolean!\n  error: String\n  token: String\n}\n\ntype GetFollowerResponse {\n  success: Boolean!\n  error: String\n  users: [User]\n}\n\ntype GetFollowingResponse {\n  success: Boolean!\n  error: String\n  users: [User]\n}\n\ntype GetMyProfileResponse {\n  success: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserResponse {\n  success: Boolean!\n  error: String\n  user: User\n}\n\ntype RequestEmailVerificationResponse {\n  success: Boolean!\n  error: String\n}\n\ntype StartPhoneVerificationResponse {\n  success: Boolean!\n  error: String\n}\n\ntype ToggleUserFollowResponse {\n  success: Boolean!\n  error: String\n  isFollowed: Boolean\n}\n\ntype UpdateMyProfileResponse {\n  success: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChat: GetChatResponse;
  GetMyPlaces: GetMyPlacesResponse;
  GetPlaces: GetPlacesResponse;
  GetPost: GetPostResponse;
  GetPostLikeUsers: GetPostLikeUsersResponse;
  GetPosts: GetPostsResponse;
  GetFollower: GetFollowerResponse;
  GetFollowing: GetFollowingResponse;
  GetMyProfile: GetMyProfileResponse;
  GetUser: GetUserResponse;
  GetUserByNick: GetUserResponse;
}

export interface GetChatQueryArgs {
  chatId: number;
}

export interface GetMyPlacesQueryArgs {
  skip: number | null;
  limit: number | null;
}

export interface GetPlacesQueryArgs {
  lat: number;
  lng: number;
  where: string | null;
}

export interface GetPostQueryArgs {
  id: number;
}

export interface GetPostLikeUsersQueryArgs {
  id: number;
  skip: number | null;
  limit: number | null;
}

export interface GetPostsQueryArgs {
  skip: number | null;
  limit: number | null;
  order: string | null;
  where: string | null;
}

export interface GetFollowerQueryArgs {
  userId: number;
  skip: number | null;
  limit: number | null;
}

export interface GetFollowingQueryArgs {
  userId: number;
  skip: number | null;
  limit: number | null;
}

export interface GetUserQueryArgs {
  id: number;
}

export interface GetUserByNickQueryArgs {
  nick: string;
}

export interface GetChatResponse {
  success: boolean;
  error: string | null;
  chat: Chat | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  senderId: number | null;
  sender: User;
  receiverId: number;
  receiver: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chatId: number | null;
  chat: Chat;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  nick: string;
  phoneNumber: string | null;
  profilePhoto: string | null;
  fbId: string | null;
  places: Array<Place> | null;
  posts: Array<Post> | null;
  megazines: Array<Megazine> | null;
  followingCount: number;
  followerCount: number;
  verifiedEmail: boolean;
  verifiedPhoneNumber: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  posts: Array<Post> | null;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  wifi: number;
  childChair: number;
  study: number;
  photos: Array<Photo> | null;
  placeId: number | null;
  place: Place | null;
  hit: number;
  isLiked: boolean | null;
  likeCount: number;
  authorId: number;
  author: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Photo {
  id: number;
  title: string | null;
  content: string | null;
  path: string;
  postId: number | null;
  post: Post | null;
  megazineId: number | null;
  megazine: Megazine | null;
  authorId: number;
  author: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Megazine {
  id: number;
  title: string;
  content: string;
  photos: Array<Photo> | null;
  placeId: number | null;
  place: Place | null;
  hit: number;
  likes: Array<User> | null;
  authorId: number;
  author: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyPlacesResponse {
  success: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetPlacesResponse {
  success: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface GetPostResponse {
  success: boolean;
  error: string | null;
  post: Post | null;
}

export interface GetPostLikeUsersResponse {
  success: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface GetPostsResponse {
  success: boolean;
  error: string | null;
  posts: Array<Post> | null;
  hasNext: boolean;
}

export interface GetFollowerResponse {
  success: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface GetFollowingResponse {
  success: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface GetMyProfileResponse {
  success: boolean;
  error: string | null;
  user: User | null;
}

export interface GetUserResponse {
  success: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  SendChatMessage: SendChatMessageResponse;
  MultipleUpload: MultipleUploadResponse;
  SingleUpload: SingleUploadResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  AddPost: AddPostResponse;
  DeletePost: DeletePostResponse;
  EditPost: EditPostResponse;
  TogglePostLike: TogglePostLikeResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  ToggleUserFollow: ToggleUserFollowResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface SendChatMessageMutationArgs {
  text: string;
  chatId: number;
}

export interface MultipleUploadMutationArgs {
  files: Array<Upload>;
}

export interface SingleUploadMutationArgs {
  file: Upload;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  placeId: number;
  name: string | null;
  isFav: boolean | null;
}

export interface AddPostMutationArgs {
  content: string | null;
  files: Array<Upload>;
  wifi: number;
  childChair: number;
  study: number;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

export interface DeletePostMutationArgs {
  id: number;
}

export interface EditPostMutationArgs {
  id: number;
  content: string;
  wifi: number;
  childChair: number;
  study: number;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

export interface TogglePostLikeMutationArgs {
  id: number;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  email: string;
  password: string;
  confirmPassword: string;
  nick: string;
  profilePhoto: string | null;
  phoneNumber: string | null;
}

export interface FacebookConnectMutationArgs {
  email: string | null;
  nick: string;
  fbId: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface ToggleUserFollowMutationArgs {
  userId: number;
}

export interface UpdateMyProfileMutationArgs {
  nick: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  profilePhoto: string | null;
  profileFile: Upload | null;
  phoneNumber: string | null;
}

export interface SendChatMessageResponse {
  success: boolean;
  error: string | null;
  message: Message | null;
}

export type Upload = any;

export interface MultipleUploadResponse {
  success: boolean;
  error: string | null;
  files: Array<File> | null;
}

export interface File {
  id: string;
  path: string;
  filename: string;
  mimetype: string;
  encoding: string;
}

export interface SingleUploadResponse {
  success: boolean;
  error: string | null;
  file: File | null;
}

export interface AddPlaceResponse {
  success: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
  success: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  success: boolean;
  error: string | null;
}

export interface AddPostResponse {
  success: boolean;
  error: string | null;
  post: Post | null;
}

export interface DeletePostResponse {
  success: boolean;
  error: string | null;
}

export interface EditPostResponse {
  success: boolean;
  error: string | null;
  post: Post | null;
}

export interface TogglePostLikeResponse {
  success: boolean;
  error: string | null;
  isLiked: boolean | null;
}

export interface CompleteEmailVerificationResponse {
  success: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  success: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  success: boolean;
  error: string | null;
  token: string | null;
  user: User | null;
}

export interface EmailSignUpResponse {
  success: boolean;
  error: string | null;
  token: string | null;
  user: User | null;
}

export interface FacebookConnectResponse {
  success: boolean;
  error: string | null;
  token: string | null;
}

export interface RequestEmailVerificationResponse {
  success: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  success: boolean;
  error: string | null;
}

export interface ToggleUserFollowResponse {
  success: boolean;
  error: string | null;
  isFollowed: boolean | null;
}

export interface UpdateMyProfileResponse {
  success: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: Message | null;
}

export interface Comment {
  id: number;
  content: string;
  postId: number | null;
  post: Post | null;
  megazineId: number | null;
  megazine: Megazine | null;
  parentId: number | null;
  parent: Comment | null;
  childs: Array<Comment> | null;
  likeCount: number | null;
  authorId: number;
  author: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

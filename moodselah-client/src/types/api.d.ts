/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deletePost
// ====================================================

export interface deletePost_DeletePost {
  __typename: "DeletePostResponse";
  success: boolean;
  error: string | null;
}

export interface deletePost {
  DeletePost: deletePost_DeletePost;
}

export interface deletePostVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignIn
// ====================================================

export interface emailSignIn_EmailSignIn_user {
  __typename: "User";
  id: number;
  email: string | null;
  nick: string;
  profilePhoto: string | null;
}

export interface emailSignIn_EmailSignIn {
  __typename: "EmailSignInResponse";
  success: boolean;
  error: string | null;
  token: string | null;
  user: emailSignIn_EmailSignIn_user | null;
}

export interface emailSignIn {
  EmailSignIn: emailSignIn_EmailSignIn;
}

export interface emailSignInVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPosts
// ====================================================

export interface getPosts_GetPosts_posts_photos {
  __typename: "Photo";
  id: number;
  title: string | null;
  content: string | null;
  path: string;
}

export interface getPosts_GetPosts_posts_author {
  __typename: "User";
  id: number;
  nick: string;
  profilePhoto: string | null;
}

export interface getPosts_GetPosts_posts {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
  wifi: number;
  childChair: number;
  study: number;
  photos: (getPosts_GetPosts_posts_photos | null)[] | null;
  author: getPosts_GetPosts_posts_author;
  createdAt: string;
  updatedAt: string | null;
}

export interface getPosts_GetPosts {
  __typename: "GetPostsResponse";
  success: boolean;
  error: string | null;
  hasNext: boolean;
  posts: (getPosts_GetPosts_posts | null)[] | null;
}

export interface getPosts {
  GetPosts: getPosts_GetPosts;
}

export interface getPostsVariables {
  skip: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlaces
// ====================================================

export interface getPlaces_GetPlaces_places_posts_photos {
  __typename: "Photo";
  id: number;
  path: string;
}

export interface getPlaces_GetPlaces_places_posts {
  __typename: "Post";
  id: number;
  content: string;
  photos: (getPlaces_GetPlaces_places_posts_photos | null)[] | null;
}

export interface getPlaces_GetPlaces_places {
  __typename: "Place";
  id: number;
  address: string;
  lat: number;
  lng: number;
  posts: (getPlaces_GetPlaces_places_posts | null)[] | null;
}

export interface getPlaces_GetPlaces {
  __typename: "GetPlacesResponse";
  success: boolean;
  error: string | null;
  places: (getPlaces_GetPlaces_places | null)[] | null;
}

export interface getPlaces {
  GetPlaces: getPlaces_GetPlaces;
}

export interface getPlacesVariables {
  lat: number;
  lng: number;
  where?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editPost
// ====================================================

export interface editPost_EditPost_post {
  __typename: "Post";
  id: number;
}

export interface editPost_EditPost {
  __typename: "EditPostResponse";
  success: boolean;
  error: string | null;
  post: editPost_EditPost_post | null;
}

export interface editPost {
  EditPost: editPost_EditPost;
}

export interface editPostVariables {
  id: number;
  content: string;
  wifi: number;
  childChair: number;
  study: number;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPost
// ====================================================

export interface getPost_GetPost_post_photos {
  __typename: "Photo";
  id: number;
  path: string;
}

export interface getPost_GetPost_post_place_posts_photos {
  __typename: "Photo";
  id: number;
  path: string;
}

export interface getPost_GetPost_post_place_posts {
  __typename: "Post";
  id: number;
  photos: (getPost_GetPost_post_place_posts_photos | null)[] | null;
}

export interface getPost_GetPost_post_place {
  __typename: "Place";
  address: string;
  lat: number;
  lng: number;
  posts: (getPost_GetPost_post_place_posts | null)[] | null;
}

export interface getPost_GetPost_post_author {
  __typename: "User";
  id: number;
  nick: string;
  profilePhoto: string | null;
}

export interface getPost_GetPost_post {
  __typename: "Post";
  id: number;
  content: string;
  wifi: number;
  childChair: number;
  study: number;
  photos: (getPost_GetPost_post_photos | null)[] | null;
  place: getPost_GetPost_post_place | null;
  author: getPost_GetPost_post_author;
  createdAt: string;
  updatedAt: string | null;
}

export interface getPost_GetPost {
  __typename: "GetPostResponse";
  success: boolean;
  error: string | null;
  post: getPost_GetPost_post | null;
}

export interface getPost {
  GetPost: getPost_GetPost;
}

export interface getPostVariables {
  id: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPost
// ====================================================

export interface addPost_AddPost_post_photos {
  __typename: "Photo";
  id: number;
  title: string | null;
  content: string | null;
  path: string;
}

export interface addPost_AddPost_post_author {
  __typename: "User";
  id: number;
  nick: string;
  profilePhoto: string | null;
}

export interface addPost_AddPost_post {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
  photos: (addPost_AddPost_post_photos | null)[] | null;
  author: addPost_AddPost_post_author;
  createdAt: string;
  updatedAt: string | null;
}

export interface addPost_AddPost {
  __typename: "AddPostResponse";
  success: boolean;
  error: string | null;
  post: addPost_AddPost_post | null;
}

export interface addPost {
  AddPost: addPost_AddPost;
}

export interface addPostVariables {
  content?: string | null;
  files: any[];
  wifi: number;
  childChair: number;
  study: number;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_GetUserByNick_user {
  __typename: "User";
  id: number;
  email: string | null;
  nick: string;
  profilePhoto: string | null;
  followingCount: number;
  followerCount: number;
}

export interface getUser_GetUserByNick {
  __typename: "GetUserResponse";
  success: boolean;
  error: string | null;
  user: getUser_GetUserByNick_user | null;
}

export interface getUser_GetPosts_posts_photos {
  __typename: "Photo";
  id: number;
  title: string | null;
  content: string | null;
  path: string;
}

export interface getUser_GetPosts_posts_author {
  __typename: "User";
  id: number;
  nick: string;
  profilePhoto: string | null;
}

export interface getUser_GetPosts_posts {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
  wifi: number;
  childChair: number;
  study: number;
  photos: (getUser_GetPosts_posts_photos | null)[] | null;
  author: getUser_GetPosts_posts_author;
  createdAt: string;
  updatedAt: string | null;
}

export interface getUser_GetPosts {
  __typename: "GetPostsResponse";
  success: boolean;
  error: string | null;
  hasNext: boolean;
  posts: (getUser_GetPosts_posts | null)[] | null;
}

export interface getUser {
  GetUserByNick: getUser_GetUserByNick;
  GetPosts: getUser_GetPosts;
}

export interface getUserVariables {
  nick: string;
  skip: number;
  where: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMyProfile
// ====================================================

export interface UpdateMyProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  success: boolean;
  error: string | null;
}

export interface UpdateMyProfile {
  UpdateMyProfile: UpdateMyProfile_UpdateMyProfile;
}

export interface UpdateMyProfileVariables {
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  nick?: string | null;
  profilePhoto?: string | null;
  phoneNumber?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignUp
// ====================================================

export interface emailSignUp_EmailSignUp_user {
  __typename: "User";
  id: number;
  email: string | null;
  nick: string;
  profilePhoto: string | null;
}

export interface emailSignUp_EmailSignUp {
  __typename: "EmailSignUpResponse";
  success: boolean;
  error: string | null;
  token: string | null;
  user: emailSignUp_EmailSignUp_user | null;
}

export interface emailSignUp {
  EmailSignUp: emailSignUp_EmailSignUp;
}

export interface emailSignUpVariables {
  email: string;
  password: string;
  confirmPassword: string;
  nick: string;
  profilePhoto?: string | null;
  phoneNumber?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  nick: string;
  email: string | null;
  profilePhoto: string | null;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  success: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================

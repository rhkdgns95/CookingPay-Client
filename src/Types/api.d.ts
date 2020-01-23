/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyProfile
// ====================================================

export interface getMyProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
}

export interface getMyProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: getMyProfile_GetMyProfile_user | null;
}

export interface getMyProfile {
  GetMyProfile: getMyProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: emailSignIn
// ====================================================

export interface emailSignIn_EmailSignIn {
  __typename: "EmailSignInResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
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
// GraphQL query operation: getAllPost
// ====================================================

export interface getAllPost_GetAllPost_posts_photoUrls {
  __typename: "PostImage";
  id: number;
  url: string;
  postId: number | null;
}

export interface getAllPost_GetAllPost_posts_writer {
  __typename: "User";
  name: string;
}

export interface getAllPost_GetAllPost_posts {
  __typename: "Post";
  id: number;
  title: string;
  description: string;
  createdAt: string;
  photoUrls: (getAllPost_GetAllPost_posts_photoUrls | null)[] | null;
  writer: getAllPost_GetAllPost_posts_writer;
}

export interface getAllPost_GetAllPost {
  __typename: "GetAllPostResponse";
  ok: boolean;
  error: string | null;
  posts: (getAllPost_GetAllPost_posts | null)[] | null;
}

export interface getAllPost {
  GetAllPost: getAllPost_GetAllPost;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_CreatePost {
  __typename: "CreatePostResponse";
  ok: boolean;
  error: string | null;
  postId: number | null;
}

export interface createPost {
  CreatePost: createPost_CreatePost;
}

export interface createPostVariables {
  title: string;
  description: string;
  photoUrls?: (string | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignUp
// ====================================================

export interface emailSignUp_EmailSignUp {
  __typename: "EmailSignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface emailSignUp {
  EmailSignUp: emailSignUp_EmailSignUp;
}

export interface emailSignUpVariables {
  name: string;
  password: string;
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemUser
// ====================================================

export interface ItemUser {
  __typename: "User";
  id: number;
  name: string;
  email: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemPost
// ====================================================

export interface ItemPost {
  __typename: "Post";
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ItemPostImage
// ====================================================

export interface ItemPostImage {
  __typename: "PostImage";
  id: number;
  url: string;
  postId: number | null;
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

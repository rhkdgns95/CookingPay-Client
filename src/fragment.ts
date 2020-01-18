import { gql } from "apollo-boost";

export const FRAGMENT_USER = gql`
    fragment ItemUser on User {
        id
        name
        email
    }
`;

export const FRAGMENT_POST = gql`
  fragment ItemPost on Post {
        id
        title
        description
        createdAt
    }
`;

export const FRAGMENT_POSTIMAGE = gql`
    fragment ItemPostImage on PostImage {
        id
        url
        postId
    }
`;
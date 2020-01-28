import { gql } from "apollo-boost";

export const FRAGMENT_USER = gql`
    fragment ItemUser on User {
        id
        name
        email
        photo
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

export const FRAGMENT_PUBLIC_MESSAGE = gql`
    fragment ItemPublicMessage on PublicMessage {
        id
        text
        createdAt
    }
`;
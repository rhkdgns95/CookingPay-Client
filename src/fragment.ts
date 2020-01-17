import { gql } from "apollo-boost";

export const FRAGMENT_ITEM = gql`
    fragment UserItem on User {
        id
        name
        email
    }
`;
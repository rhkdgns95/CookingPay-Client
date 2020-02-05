import { gql } from "apollo-boost";

export const FIND_EMAIL = gql`
    query findEmail($name: String!) {
        FindEmail(name: $name) {
            ok
            error
            email
        }
    }
`;
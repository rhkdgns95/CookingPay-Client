import { gql } from "apollo-boost";

export const EMAIL_SIGN_IN = gql`
    query emailSignIn($email: String! $password: String!) {
        EmailSignIn(email: $email password: $password) {
            ok
            error
        }
    }
`;
import { gql } from "apollo-boost";

export const EMAIL_SIGN_UP = gql`
    mutation emailSignUp($name: String! $password: String! $email: String! $photo: String) {
        EmailSignUp(name: $name password: $password email: $email photo: $photo) {
            ok
            error
            token
        }
    }
`;
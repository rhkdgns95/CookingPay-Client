import { gql } from "apollo-boost";

export const UPDATE_MY_PROFILE = gql`
    mutation updateMyProfile($name: String $password: String $photo: String) {
        UpdateMyProfile(name: $name, password: $password, photo: $photo) {
            ok
            error
        }
    }
`;
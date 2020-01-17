import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
    {
        auth @client {
            isLoggedIn 
        }
    }
`;

export const LOGGED_IN = gql`
    mutation loggedIn($token: String!) {
        UserLoggedIn(token: $token) @client
    }  
`;
export const LOGGED_OUT = gql`
    mutation loggedOut {
        UserLoggedOut @client
    }
`;

import { gql } from "apollo-boost";
import { FRAGMENT_PUBLIC_MESSAGE, FRAGMENT_USER } from "../../fragment";

export const SUBSCRIPTION_PUBLIC_MESSAGE = gql`
    subscription subscriptionPublicMessage {
        SubscriptionPublicMessage {
            ...ItemPublicMessage
            writer {
                ...ItemUser
            }

        }
    }
    ${FRAGMENT_PUBLIC_MESSAGE}
    ${FRAGMENT_USER}
`;

export const GET_PUBLIC_MESSAGE = gql`
    query getPublicMessage {
        GetPublicMessage {
            ok
            error 
            publicMessages {
                ...ItemPublicMessage
                writer {
                    ...ItemUser
                }
            }
        }
    }
    ${FRAGMENT_PUBLIC_MESSAGE}
    ${FRAGMENT_USER}
`;

export const SEND_PUBLIC_MESSAGE = gql`
    mutation sendPublicMessage($text: String!) {
        SendPublicMessage(text: $text) {
            ok
            error
            messageId
        }
    }
`;

export const GET_USER_LIST = gql`
    query getUserList {
        GetUserList {
            ok
            error
            users {
                ...ItemUser
            }            
        }
    }
    ${FRAGMENT_USER}
`;

import { gql } from "apollo-boost";
import { FRAGMENT_PUBLIC_MESSAGE } from "../../fragment";

export const SUBSCRIPTION_PUBLIC_MESSAGE = gql`
    subscription subscriptionPublicMessage {
        SubscriptionPublicMessage {
            ...ItemPublicMessage
            writer {
                id
                name
            }

        }
    }
    ${FRAGMENT_PUBLIC_MESSAGE}
`;

export const GET_PUBLIC_MESSAGE = gql`
    query getPublicMessage {
        GetPublicMessage {
            ok
            error 
            publicMessages {
                ...ItemPublicMessage
                writer {
                    id
                    name
                }
            }
        }
    }
    ${FRAGMENT_PUBLIC_MESSAGE}
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
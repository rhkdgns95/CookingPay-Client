import { gql } from "apollo-boost";

export const SUBSCRIPTION_PUBLIC_MESSAGE = gql`
    subscription subscriptionPublicMessage {
        SubscriptionPublicMessage {
            id
            text
        }
    }
`;
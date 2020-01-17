import { gql } from "apollo-boost";
import { FRAGMENT_ITEM } from "../../fragment";

export const GET_MY_PROFILE = gql`
    query getMyProfile {
        GetMyProfile {
            ok
            error
            user {
                ...UserItem
            }
        }
    }
    ${FRAGMENT_ITEM}
`;
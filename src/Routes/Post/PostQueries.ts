import { gql } from "apollo-boost";
import { FRAGMENT_POST, FRAGMENT_POSTIMAGE } from "../../fragment";

export const GET_POSTS = gql`
    query getAllPost {
        GetAllPost {
            ok
            error 
            posts {
                ...ItemPost
                photoUrls {
                    ...ItemPostImage
                }
                writer {
                    name
                }
            }
        }
    }
    ${FRAGMENT_POST}
    ${FRAGMENT_POSTIMAGE}
`;

export const CREATE_POST = gql`
    mutation createPost($title: String! $description: String! $photoUrls: [String]) {
        CreatePost(title: $title description: $description photoUrls: $photoUrls) {
            ok
            error
            postId
        }
    }
`;


import React, { useContext, createContext, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { createPost, createPostVariables, getAllPost, PostItem, getAllPost_GetAllPost_posts } from "../../Types/api";
import { CREATE_POST, GET_POSTS } from "./PostQueries";
import { useAppContext } from "../../Components/App/AppProvider";

interface IContext {
    tab: number;
    posts: Array<getAllPost_GetAllPost_posts | null>;
    onChangeTab: (newStep: number) => any;
    handleCreatePost: (title: string, description: string, photoUrls?: string[]) => void;
}
const InitContext: IContext = {
    tab: 0,
    posts: [],
    onChangeTab: () => {},
    handleCreatePost: () => {}
};

const PostContext: React.Context<IContext> = createContext<IContext>(InitContext);

const usePostContext = () => useContext(PostContext);

const useFetch = (): { value: IContext } => {
    const { progress, handleProgress, handleMessages, progressTimeOut } = useAppContext();
    const [tab, setStep] = useState<number>(0);
    const { data, loading } = useQuery<getAllPost, void>(GET_POSTS, {
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            // console.log("GetPosts onCompleted: ", data);
        },
        onError: data => {
            console.log("GetPosts onError: ", data);
        }
    });

    const posts: Array<getAllPost_GetAllPost_posts | null>  = data?.GetAllPost.posts || [];
    
    const [ postMutation ] = useMutation<createPost, createPostVariables>(CREATE_POST, {
        refetchQueries: [
            { query: GET_POSTS }
        ],
        onCompleted: data => {
            // console.log("CreatePost onCompleted: ", data);
            const { CreatePost: { ok, error, postId }} = data;
            if(progress) {
                setTimeout(() => {
                    if(ok) {
                        handleMessages( {ok, text: "Created Post." });
                    } else {
                        handleMessages( {ok, text: error });
                    }
                    handleProgress(false);
                    onChangeTab(0);
                }, progressTimeOut);
            }
        },
        onError: data => {
            if(progress) {
                setTimeout(() => {
                    handleProgress(false);
                    handleMessages({ ok: false, text: data.message });
                }, progressTimeOut);
            }
            console.log("CreatePost onError: ", data);
        }
    });

    const handleCreatePost = (title: string, description: string, photoUrls?: string[]) => {
        postMutation({
            variables: {
                title, 
                description,
                photoUrls
            }
        });
    }
    const onChangeTab = (newStep: number) => {
        setStep(newStep);
    }
    return {
        value: {
            tab,
            posts,
            onChangeTab,
            handleCreatePost,
        }
    };
}

const PostProvider: React.FC<any> = ({
    children
}) => (
    <PostContext.Provider { ...useFetch()}>
        {
            children
        }
    </PostContext.Provider>
);
export { usePostContext };
export default PostProvider;
import React, { useContext, createContext } from "react";

interface IContext {

}
const InitContext: IContext = {

}
const PostContext: React.Context<IContext> = createContext<IContext>(InitContext);

const usePostContext = () => useContext(PostContext);

const useFetch = (): { value: IContext } => {
    return {
        value: {

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
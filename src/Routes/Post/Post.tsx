import React from "react";
import styled from "../../Styles/typed-components";
import PostProvider from "./PostProvider";
import NavBar from "../../Components/NavBar";
import { useAppContext } from "../../Components/App/AppProvider";
import { useUserContext } from "../../Components/User/User";

const Post = () => (
    <PostProvider>
        <PostPresenter />
    </PostProvider>
);

const PostPresenter = () => {
    const { user } = useUserContext();
    return (
        <Container>
            <NavBar name={user?.name}/>
            <Wrapper className={"row"}>
                
                Post.
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`

`;
const Wrapper = styled.div`

`;
export default Post;
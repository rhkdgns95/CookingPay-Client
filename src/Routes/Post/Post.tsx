import React from "react";
import styled from "../../Styles/typed-components";
import PostProvider, { usePostContext } from "./PostProvider";
import NavBar from "../../Components/NavBar";
import { useUserContext } from "../../Components/User/User";
import TopTitle from "../../Components/TopTitle";
import TabItem from "../../Components/TabItem";
import PostCard from "../../Components/PostCard";
import FormPost from "../../Forms/FormPost";
import { getTime } from "../../Utils/getTime";

const Post = () => (
    <PostProvider>
        <PostPresenter />
    </PostProvider>
);

const PostPresenter = () => {
    const { user } = useUserContext();
    const { posts, tab, onChangeTab } = usePostContext();
    return (
        <Container>
            <NavBar name={user?.name} menu={"post"}/>
            <TopTitle title={"POST"} tabs={
                <>
                    <TabItem active={tab === 0} text={"View"} value={0} onChangeTab={onChangeTab}/>
                    <TabItem active={tab === 1} text={"Write"} value={1} onChangeTab={onChangeTab}/>
                </>
            }/>
            <Wrapper className={"row"}>
            {
                tab == 0 &&
                posts && 
                posts.length > 0 ? (
                    <PostGroup>
                        {
                            posts.map((item, key) => 
                                <PostCard key={key} name={item?.writer.name || ""} title={item?.title  || ""} description={item?.description || ""} imgSrc={item!.photoUrls!} createdAt={getTime(item?.createdAt || "")}/>
                            )
                        }
                    </PostGroup>
                ) : (
                    tab == 0 &&
                    posts && 
                    posts.length === 0 && (
                        <EmptyPost>
                            작성된 게시글이 없습니다.
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z"/></svg>
                        </EmptyPost>
                    )
                )
            }
            {
                tab === 1 && ( 
                    <FormPost />
                )
            }
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`

`;
const Wrapper = styled.div`

`;
const PostGroup = styled.div`
    display: flex;
    flex: 3;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    margin: 15px 0;
    @media(max-width: 510px) {
        justify-content: space-between;
    }
`;

const EmptyPost = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 50px;
    background-color: white;
    margin: 10px 0;
    font-size: 14px;
    height: 500px;
    color: #9c9c9c;
    border: 1px solid #dfdfdf;
    & svg {
        position: absolute;
        z-index: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: .1;
        width: 100px;
        height: 100px;
    }
`;

export default Post;
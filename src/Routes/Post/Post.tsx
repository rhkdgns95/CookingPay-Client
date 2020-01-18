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

const ImgPathEmpty: string = "https://cdn4.buysellads.net/uu/1/57095/1576856619-ad3.png";

const PostPresenter = () => {
    const { user } = useUserContext();
    const { posts, tab, onChangeTab } = usePostContext();
    return (
        <Container>
            <NavBar name={user?.name}/>
            <TopTitle title={"POST"} tabs={
                <>
                    <TabItem active={tab === 0} text={"View"} value={0} onChangeTab={onChangeTab}/>
                    <TabItem active={tab === 1} text={"Write"} value={1} onChangeTab={onChangeTab}/>
                </>
            }/>
            <Wrapper className={"row"}>
            {
                posts && posts.length > 0 && tab == 0 && (
                    <PostGroup>
                        {
                            posts.map((item, key) => 
                                <PostCard key={key} name={item?.writer.name || ""} title={item?.title  || ""} description={item?.description || ""} imgSrc={item?.photoUrls![0]?.url || ImgPathEmpty} createdAt={getTime(item?.createdAt || "")}/>
                            )
                        }
                    </PostGroup>
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
    & > div {
        width: 30%;
        margin: 10px 10px;
    }
    @media(max-width: 910px) {
        & > div {
            width: 45%;
        }
    }
    @media(max-width: 510px) {
        justify-content: space-between;
        & > div {
            width: 49%;
            margin: 0;
            margin-bottom: 7.5px;
            align-items: center;
        }
    }
`;


export default Post;
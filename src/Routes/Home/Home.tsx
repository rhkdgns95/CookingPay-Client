import React from "react";
import styled from "../../Styles/typed-components";
import HomeProvider, { useHomeContext } from "./HomeProvider";
import NavBar from "../../Components/NavBar";
import { useUserContext } from "../../Components/User/User";
import PublicChatRoom from "../../Components/PublicChatRoom";

const Home = () => (
    <HomeProvider>
        <HomePresenter />
    </HomeProvider>
);

const HomePresenter = () => {
    const { user } = useUserContext();
    return (
        <Container>
            <NavBar name={user?.name || ""}/>
            <Wrapper>
                <Row className={"row"}>
                   <PublicChatRoom   
                        user={user}
                   />
                </Row>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`

`;

const Wrapper = styled.div`

`;
const Row = styled.div`

`;

export default Home;
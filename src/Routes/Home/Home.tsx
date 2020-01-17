import React from "react";
import styled from "../../Styles/typed-components";
import HomeProvider, { useHomeContext } from "./HomeProvider";
import NavBar from "../../Components/NavBar";
import { useUserContext } from "../../Components/User/User";

const Home = () => (
    <HomeProvider>
        <HomePresenter />
    </HomeProvider>
);

const HomePresenter = () => {
    const { user } = useUserContext();
    return (
        <Container>
            <Wrapper>
                <NavBar name={user?.name || ""}/>
                Home..
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`

`;

const Wrapper = styled.div`

`;


export default Home;
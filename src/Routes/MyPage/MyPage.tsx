import React from "react";
import styled from "../../Styles/typed-components";
import NavBar from "../../Components/NavBar";
import FormMyProfile from "../../Forms/FormMyProfile";
import { useUserContext } from "../../Components/User/User";
import MyPageProvider from "./MyPageProvider";

const MyPage = () => (
    <MyPageProvider>
        <MyPagePresenter/>
    </MyPageProvider>
);

const MyPagePresenter = () => {
    const { user } = useUserContext();
    return (
        <Container>
            <NavBar />
            <Wrapper>
                {
                    user && 
                        <FormMyProfile 
                            name={user.name}
                            photo={user.photo}
                        />
                }
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`

`;

const Wrapper = styled.div`

`;


export default MyPage;
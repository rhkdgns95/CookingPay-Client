import React from "react";
import styled from "../../Styles/typed-components";
import SignUpProvider from "./SignUpProvider";
import FormSignUp from "../../Forms/FormSignUp";


const SignUp = () => (
    <SignUpProvider>
        <SignUpPresenter />
    </SignUpProvider>
)

const SignUpPresenter = () => (
    <Container>
        <Wrapper className={"row"}>
            <FormSignUp />
        </Wrapper>    
    </Container>
);

const Container = styled.div`
    height: 100%;
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export default SignUp;
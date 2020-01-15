import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import InputText from "../../Components/InputText";
import { Link } from "react-router-dom";

const useFetch = () => {
    const [value, setValue] = useState<string>('');

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        setValue(value);
    }

    return {
        value,
        onChange
    }
}
const Login = () => {
    const email = useFetch();
    const password = useFetch();
    
    return (
        <Container>
            <Wrapper>
                <LoginForm>
                    <InputText type={"text"} label={"이메일"} id={"email"} value={email.value} onChange={email.onChange} />
                    <InputText type={"password"} label={"패스워드"} id={"password"} value={password.value} onChange={password.onChange} />
                    <Linkbar>
                        <LinkButton to={"/"}>Sign up</LinkButton>
                        <LinkButton to={"/"}>Find account</LinkButton>
                    </Linkbar>
                    <LoginButton type={'button'} value={"Login"} />
                </LoginForm>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
    width: 100%;
`;

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginForm = styled.div`
    width: 90%;
    max-width: 500px;
    padding: 30px 10px;
    border-radius: 6px;
    box-shadow: 1px 2px 4px rgba(0,0,0,.24), -1px -2px 4px rgba(0,0,0,.14);
`;

const Linkbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    width: 100%;
`;
const LinkButton = styled(Link)`
    position: relative;
    border: 0;
    outline: 0;
    font-size: 12px;
    color: #b6b6b6;
    transition: .2s;
    &::after,
    &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 1px;
        top: 100%;
        margin-top: 5px;
        left: 0;
        background-color: #4f8dd4;
        transition: inherit;
    }
    &::before {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
    }
    &::after {
        left: auto;
        right: 0;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
    }
    &:hover {
        color: #206ec7;
        &::after,
        &::before {
            width: 50%;
        }
    }
`;
const LoginButton = styled.input`
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 7px;
    background-color: #206ec7;
    color: white;
    border: 0;
    cursor: pointer;
    border-radius: 2px;
    transition: background-color .2s;
    &:hover {
        background-color: #154281;
    }
`;
export default Login;
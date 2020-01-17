import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import InputText from "../../Components/InputText";
import { Link } from "react-router-dom";
import { useLazyQuery, useApolloClient, useMutation } from "react-apollo";
import { EMAIL_SIGN_IN } from "./LoginQueries";
import { useAppContext } from "../../Components/App/AppProvider";
import { LOGGED_IN } from "./LoginQueries.local";
import { emailSignInVariables, emailSignIn } from "../../Types/api";

const useInput = (progress: boolean) => {
    const [value, setValue] = useState<string>('');

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        // progress중인 경우 변경 X
        if(!progress) { 
            const { target: { value }} = event;
            setValue(value);
        }
    }

    return {
        value,
        onChange,
    };
}

const useFetch = () => {
    const { handleMessages, progress, handleProgress, progressTimeOut } = useAppContext();
    const inputEmail = useInput(progress);
    const inputPassword = useInput(progress);
    const [ loginMutation ] = useMutation(LOGGED_IN);

    const [ loginQuery ] = useLazyQuery<emailSignIn, emailSignInVariables>(EMAIL_SIGN_IN, {
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            const { EmailSignIn: { ok, error, token }} = data;
            if(progress) {
                setTimeout(() => {
                    if(ok && token) {
                        handleMessages({
                            ok,
                            text: "성공"
                        });
                        loginMutation({
                            variables: {
                                token
                            }
                        });

                    } else {
                        handleMessages({
                            ok,
                            text: error
                        });
                    }    
                    handleProgress(false);
                }, progressTimeOut);
            }
        },
        onError: data => {
            console.log('EmailSignIn onError: ', data);
            if(progress) {
                setTimeout(() => {
                    handleMessages({
                        ok: false,
                        text: data.message
                    });
                    handleProgress(false);
                }, progressTimeOut);
            }
        }
    });
    
    const handleLogin = () => {
        const email = inputEmail.value;
        const password = inputPassword.value;

        if(email.length > 0 && password.length > 0) {
            if(!progress) {
                handleProgress(true);
                loginQuery({
                    variables: {
                        email,
                        password
                    }
                });
            }
        }
    }

    return {
        inputEmail,
        inputPassword,
        handleLogin
    };

};

const Login = () => {
    const { inputEmail, inputPassword, handleLogin } = useFetch();
    
    return (
        <Container>
            <Wrapper>
                <LoginForm onSubmit={
                    e => {
                        e.preventDefault();
                        handleLogin();
                    }
                }>
                    <InputText type={"text"} label={"이메일"} id={"email"} { ...inputEmail } />
                    <InputText type={"password"} label={"패스워드"} id={"password"} { ...inputPassword } />
                    <Linkbar>
                        <LinkButton to={"/"}>Sign up</LinkButton>
                        <LinkButton to={"/"}>Find account</LinkButton>
                    </Linkbar>
                    <LoginButton type={'submit'} value={"Login"}/>
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

const LoginForm = styled.form`
    background-color: white;
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
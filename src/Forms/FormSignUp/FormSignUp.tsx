import React, { useState } from 'react';
import styled from '../../Styles/typed-components';
import InputText from '../../Components/InputText';
import { useMutation } from 'react-apollo';
import { emailSignUpVariables, emailSignUp } from '../../Types/api';
import { EMAIL_SIGN_UP } from '../../Routes/SignUp/SignUpQueries';
import { useAppContext } from '../../Components/App/AppProvider';
import { Link } from 'react-router-dom';
import { LOGGED_IN } from '../../Routes/Login/LoginQueries.local';


const useInput = (): IUseInputText => {
    const [value, setValue] = useState<string>("");
    
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        setValue(value);
    };

    return {
        value,
        onChange
    };
}
const useFetch = () => {
    const { handleMessages, progress, handleProgress, progressTimeOut } = useAppContext();
    const formName = useInput();
    const formEmail = useInput();
    const formPassword = useInput();
    
    const [ login ] = useMutation<any, any>(LOGGED_IN, {
        onCompleted: data => {
            handleProgress(true);
            handleMessages({
                ok: true,
                text: `Welcome, ${formName.value}!`
            });
        },
        onError: data => {
            handleProgress(false);
            handleMessages({ ok: false, text: data.message });
        }
    });

    const [signUp] = useMutation<emailSignUp, emailSignUpVariables>(EMAIL_SIGN_UP, {
        onCompleted: data => {
            if(progress) {
                const { EmailSignUp: { ok, error= "Failed", token }} = data;
                setTimeout(() => {
                    if(ok && token) {
                        // <추가예정> 자동로그인
                        login({
                            variables: {
                                token
                            }
                        });
                    } else {
                        handleProgress(false);
                        handleMessages({
                            ok: false,
                            text: error
                        });
                    }
                }, progressTimeOut);
            }
        },
        onError: data => {
            if(progress) {
                setTimeout(() => {
                    handleProgress(false)
                    handleMessages({ ok: false, text: data.message });
                }, progressTimeOut);
            }
            console.log("EmailSignUp Error: ", data);
        }
    });

    return {
        formName,
        formEmail,
        formPassword,
        signUp
    };
}
const FormSignUp = () => {
    const { handleMessages, progress, handleProgress } = useAppContext();
    const { formName, formPassword, formEmail, signUp } = useFetch();

    const formVerify = (): boolean => {
        let text: string = "";
        if(formName.value.length === 0) {
            text = "Please, Enter Name Field."
        } else if(formPassword.value.length === 0) {
            text = "Please, Enter Password Field."
        } else if(formEmail.value.length === 0) {
            text = "Please, Enter Email Field."
        }
        if(text !== "") {
            handleMessages({ ok: false, text });
            return false;
        } else {
            return true;
        }
        
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if(!progress) {
            const { value: name } = formName;
            const { value: email } = formEmail;
            const { value: password } = formPassword;

            const isVerify: boolean = formVerify();

            if(isVerify) {
                handleProgress(true);
                signUp({
                    variables: {
                        email,
                        name,
                        password
                    }
                });    
            }
        }
    }

    return (
        <Container>
            <Wrapper>
                <Header>
                    Cooking Pay
                </Header>
                <Form onSubmit={handleSubmit}>
                    <InputText id={"name"} label={"Name"} type={"text"} { ...formName }/>
                    <InputText id={"email"} label={"Email"} type={"text"} { ...formEmail }/>
                    <InputText id={"password"} label={"Password"} type={"password"} { ...formPassword }/>
                    <SubmitBtn type={"submit"} value={"submit"}/>
                </Form>
            </Wrapper>
            <BottomBar>
                계정이 있으신가요? <GoHome to={"/"}>돌아가기</GoHome>
            </BottomBar>
        </Container>
    )
};

const Container = styled.div`
    width: 100%;
`;
const Header = styled.h5`
    font-weight: 400;
    text-align: center;
    margin-bottom: 50px;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
`;
const Wrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 550px;
    width: 100%;
    padding: 30px 10px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 1px 2px 1px rgba(50,50,50,.22);
`;
const Form = styled.form`

`;
const SubmitBtn = styled.input`
    width: 100%;
    padding: 8.5px;
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    background-color: #fb774d;
    color: white;
    font-size: 12px;
    letter-spacing: .5px;
    text-transform: uppercase;
    transition: .2s;
    margin-top: 20px;
    &:hover {
        box-shadow: 0 2px 4px rgba(0,0,0,.2);
        background-color: #f5683b;
    }
    &:focus,
    &:active {
        outline: none;
    }
`;
const BottomBar = styled.div`
    margin: 0 auto;
    margin-top: 30px;
    max-width: 550px;
    padding: 30px;
    width: 100%;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 1px 2px 1px rgba(50,50,50,.22);
    text-align: center;
    font-size: 14px;
`;
const GoHome = styled(Link)`
    margin-left: 5px;
    color: #ff5620;
    transition: .2s;
    &:hover {
        font-weight: bold;
    }
`;
export default FormSignUp;
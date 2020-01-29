import React, { useState, SyntheticEvent, useRef } from 'react';
import styled from '../../Styles/typed-components';
import InputText from '../../Components/InputText';
import { useMutation } from 'react-apollo';
import { emailSignUpVariables, emailSignUp } from '../../Types/api';
import { EMAIL_SIGN_UP } from '../../Routes/SignUp/SignUpQueries';
import { useAppContext } from '../../Components/App/AppProvider';
import { Link } from 'react-router-dom';
import { LOGGED_IN } from '../../Routes/Login/LoginQueries.local';
import InputPhoto from '../../Components/InputPhoto';
import { CloudinaryPreset, CloudinaryURL, CloudinaryApiKey } from '../../Components/App/AppPresenter';
import Axios from 'axios';
import { GET_USER_LIST } from '../../Components/PublicChatRoom/PublicChatRoomQueries';

/**
 *  MAX_PHOTO_SIZE: 
 *  최대 이미지 업로드 가능한 크기 (파일은 바이트 단위로 표시)
 * 
 *  - 1MB = 10024KB K-Byte
 *  - 1KB = 10024B Byte
 */
const MAX_PHOTO_SIZE: number = 1024 * 1024;


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
    const inputFileRef = useRef<any>();

    const [ login ] = useMutation<any, any>(LOGGED_IN, {
        onCompleted: data => {
            handleProgress(false);
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
        refetchQueries: GET_USER_LIST, // 로그인 후 유저리스틀 캐시가 아닌 서버에서 쿼리를 재요청하여 가져올수있도록 한다.
        onCompleted: data => {
            if(progress) {
                const { EmailSignUp: { ok, error= "Failed", token }} = data;
                setTimeout(() => {
                    if(ok && token) {
                        // 아래의 로그인에서 handleProgress를 false로 변경.
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
        inputFileRef,
        formName,
        formEmail,
        formPassword,
        signUp
    };
}
const FormSignUp = () => {
    const { handleMessages, progress, handleProgress } = useAppContext();
    const { inputFileRef, formName, formPassword, formEmail, signUp } = useFetch();
    const [ formPhoto, setFormPhoto ] = useState<string>("");
    const [ uploadedFile, setUploadedFile ] = useState<File>();

    const handleChangePhoto: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { currentTarget: { files = [] }} = e;
        
        const getImage = async (data: any) => {
            const { target: { result }} = data;
            if(result) {
                setFormPhoto(result);
            }
        }
        /* 파일 업로드 도중 취소누른 경우 */
        if(e.target.value.length <= 0) {
            setFormPhoto("");
            setUploadedFile(undefined);

        } else if(files) {
            
            const { type, size } = files[0];
            /**
             *   File 검증:
             *   1. 이미지 확장자 이미지인지 확인
             *   2. 파일 사이즈 1GB 이하. (MAX_PHOTO_SIZE)
             */
            if(type.match("image")) {
                if(size <= MAX_PHOTO_SIZE) {
                    setUploadedFile(files[0]);
                    const reader = new FileReader();
                    reader.onload = getImage;
                    reader.readAsDataURL(files[0])
                } else {
                    const text: string = "Please, upload an image no larger than 1MB"
                    handleMessages({ ok: false, text });
                }
            } else {
                const text: string = "Please, upload image type";
                handleMessages({ ok: false, text });
            }
        }
    }

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
    /**
     *  handleCancelUploaded: 
     *  업로드 Input과 Photo들을 초기화.
     */
    const handleCancelUploaded = (e: any) => {
        e.preventDefault();
        if(inputFileRef.current) {
            if(inputFileRef.current.value) { // input[type='file']을 초기화 시킴(중복된 사진 업로드 시 onChange가 동작안하는것을 방지)
                inputFileRef.current.value = "";
                setFormPhoto("")
                setUploadedFile(undefined);
            }
        }
    };

    const onUploadCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", CloudinaryApiKey);
        formData.append('upload_preset', CloudinaryPreset);
        formData.append('timestamp', String(Date.now() / 1000));

        const request = await Axios.post(CloudinaryURL, formData);

        if(request) {
            const { status, statusText } = request;
            if(status === 200 && statusText === "OK") {
                const { secure_url } = request.data;
                return secure_url;
            } else {
                // handleProgress(false);
                handleMessages({ ok: false, text: "Error upload." });    
                return null;
            }
        } else {
            // 파일 업로드 클라우드 에러발생.
            handleProgress(false);
            handleMessages({ ok: false, text: "Error upload." });
            return null;
        }
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        if(!progress) {
            const { value: name } = formName;
            const { value: email } = formEmail;
            const { value: password } = formPassword;
            const isVerify: boolean = formVerify();

            if(isVerify) {
                handleProgress(true);
                /**
                 *  사진이 있는경우와 없는경우
                 *   1. 있는경우 - 클라우드에 파일 업로드 후 서버에 저장
                 *   2. 없는경우 - 서버에 photo: null값과 함께 저장.
                 */
                if(formPhoto && uploadedFile) {
                    const photo: string | null = await onUploadCloudinary(uploadedFile);
                    if(photo) {
                        signUp({
                            variables: {
                                email,
                                name,
                                password,
                                photo
                            }
                        });    
                    }
                } else {
                    signUp({
                        variables: {
                            email,
                            name,
                            password,
                            photo: null
                        }
                    });    
                }
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
                    <InputPhoto inputFileRef={inputFileRef} photo={formPhoto !== "" ? formPhoto : null} handleChangePhoto={handleChangePhoto} handleCancelUploaded={handleCancelUploaded}/>
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
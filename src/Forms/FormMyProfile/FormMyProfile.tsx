import React, { useState, useRef, useEffect } from "react";
import styled from "../../Styles/typed-components";
import InputText from "../../Components/InputText";
import InputPhoto from "../../Components/InputPhoto";
import { useAppContext } from "../../Components/App/AppProvider";
import { CloudinaryDestroyURL, CloudinaryApiKey, CloudinaryPreset, CloudinaryURL } from "../../Components/App/AppPresenter";
import Axios from "axios";
import { useMyPageContext } from "../../Routes/MyPage/MyPageProvider";

/**
 *  MAX_PHOTO_SIZE: 
 *  최대 이미지 업로드 가능한 크기 (파일은 바이트 단위로 표시)
 * 
 *  - 1MB = 10024KB K-Byte
 *  - 1KB = 10024B Byte
 */
const MAX_PHOTO_SIZE: number = 1024 * 1024;

const useInput = (initValue: string): IUseInputText => {
    const [value, setValue] = useState<string>(initValue);
    
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        setValue(value);
    };

    return {
        value,
        onChange
    };
};

const useFetch = (initName: string, initPhoto: string | null) => {
    const { handleMessages, progress, handleProgress } = useAppContext();
    const formName = useInput(initName);
    const inputFileRef = useRef<any>();
    const [formPhoto, setFormPhoto] = useState<string>(initPhoto || ""); // photo의 이미지 src
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
            // setFormPhoto("");
            // setUploadedFile(undefined);

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
    /**
     *  handleCancelUploaded: 
     *  업로드 Input과 Photo들을 초기화.
     */
    const handleCancelUploaded = (e: any) => {
        e.preventDefault();
        if(inputFileRef.current) {
            if(inputFileRef.current.value) { // input[type='file']을 초기화 시킴(중복된 사진 업로드 시 onChange가 동작안하는것을 방지)
                inputFileRef.current.value = ""; // 초기 데이터에 현재 내 프로필값이 들어간경우 file값만 undefined이다.
            } 
            setFormPhoto("");
            setUploadedFile(undefined);
        }
    };

    const formVerify = (): boolean => {
        let text: string = "";
        if(formName.value.length === 0) {
            text = "Please, Enter Name Field."
        }
        if(text !== "") {
            handleMessages({ ok: false, text });
            return false;
        } else {
            /** (최종) 저장 확인 */
            const isConfirm: boolean = window.confirm("저장하시겠습니까?");
            return isConfirm;
        }
    }
    
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
                // console.log("request.data: ", request.data);
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

    return {
        inputFileRef,
        formName,
        formPhoto,
        uploadedFile,
        handleChangePhoto,
        handleCancelUploaded,
        onUploadCloudinary,
        formVerify,
    };

}

interface IProps {
    name: string;
    photo: string | null;
}
const FormMyProfile: React.FC<IProps> = ({
    name,
    photo
}) => {
    const { progress, handleProgress } = useAppContext();
    const { updateMyProfile } = useMyPageContext();

    const { inputFileRef, formName, formPhoto, handleChangePhoto, uploadedFile, handleCancelUploaded, onUploadCloudinary, formVerify } = useFetch(name, photo);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if(!progress) {
            const isVerified: boolean = formVerify();
            if(isVerified) {
                const { value: name } = formName;
                /** 작업 실행 */
                handleProgress(true);
                
                let updatedPhoto: string | null = photo;
                
                /**
                 *  photo의 업데이트: 
                 *  
                 *  1. formPhoto !== photo일 경우:
                 *   - 현재의 photo와 다른 photo라면,
                 *   - 포토가 업데이트 되어야 될 경우만, 실행시키도록 한다. 
                 *  2. 기존의 photo가 있지만, 업데이트 될 새로운 formPhoto !== ""인 경우:
                 *   - ""로 넣어주어 서버에서 제거될 수 있도록 한다.
                 */
                if(formPhoto && uploadedFile && formPhoto !== photo) {
                    // [1]
                    updatedPhoto = await onUploadCloudinary(uploadedFile);
                } else if(updatedPhoto === null && photo !== null){
                    // [2]
                    updatedPhoto = ""
                }
                
                updateMyProfile({
                    name,
                    photo: updatedPhoto
                });
            }
        }
    }

    return (
        <Container>
            <Wrapper>
                <Form onSubmit={onSubmit}>
                    <InputPhoto 
                        inputFileRef={inputFileRef} 
                        photo={formPhoto !== "" ? formPhoto : null} 
                        handleChangePhoto={handleChangePhoto} 
                        handleCancelUploaded={handleCancelUploaded}
                    />
                    <InputText id={"name"} label={"Name"} type={"text"} { ...formName }/>
                    <UpdateButton type={"submit"} value={"UPDATE"}/>
                </Form>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
`;

const Wrapper = styled.div`
    margin: 60px auto;
    max-width: 500px;
    width: 90%;
`;
const Form  = styled.form`
    display: block;
`;
const UpdateButton = styled.input`
    display: block;
    width: 100%;
    padding: 7.5px;
    background-color: #0043ff;
    color: white;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    letter-spacing: .5px;
    margin-top: 20px;
    &:hover {
        background-color: #003cc5;
        box-shadow: 0 1px 3px rgba(0,0,0,.32);
        transition: .2s;
    }
`;
export default FormMyProfile;
import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import InputText from "../../Components/InputText";
import { useAppContext } from "../../Components/App/AppProvider";
import { usePostContext } from "../../Routes/Post/PostProvider";
import InputFile from "../../Components/InputFile";
import axios from "axios";
import { Link } from "react-router-dom";
import { CloudinaryApiKey, CloudinaryPreset, CloudinaryURL } from "../../Components/App/AppPresenter";

const useInput = (progress: boolean): IUseInputText => {
    const [value, setValue] = useState<string>("");
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if(!progress) {
            const { target: { value }} = event;
            setValue(value);
        }
    };
    
    return {
        value,
        onChange
    };
}

type TUploadState  = "before" | "uploading" | "uploaded";

const useFetch = () => {
    const { progress, handleProgress, handleMessages } = useAppContext();
    const { handleCreatePost } = usePostContext();
    const formTitle = useInput(progress);
    const formDescription = useInput(progress);
    // Upload
    const [files, setFiles] = useState<Array<File>>([]);
    const [photos, setPhotos] = useState<Array<string>>([]);
    const [uploadProgress, setUploadProgress] = useState<Array<number>>([]);
    const [isUploaded, setIsUploaded] = useState<TUploadState>("before");
    // Upload

    const handleUploadProgress = (loaded: number, index: number) => {
        // console.log("uploadProgress: ", uploadProgress);
        setUploadProgress((prev) => {
            let newProgress = prev;
            newProgress[index] = loaded;
            return newProgress
        });
    }

    const getFilesSize = (): number => {
        let total: number = 0;
        if(files.length >  0) {
            total = files[0].size;
            files.reduce((prev, next) => {
                total += next.size;
                return prev;
            });
        }
        return total;
        // const length = files[0] ? files.reduce((prev, next) => prev.size + next.size) : 0;
    };
    
    const handleAddFile = (newFile: File) => {
        /**
         *  파일의 이미지 추가
         */
        const reader = new FileReader();
        reader.onload = (event) => {
            const { target: { result }}: any = event;
            if(result) {
                setPhotos((prev) => {
                    // console.log("PREV: ", prev);
                    return [
                        ...prev,
                        result
                    ]
                });
            }
        };
        reader.readAsDataURL(newFile);
        /**
         *  프로그래스 바 생성
         */
        setUploadProgress([
            ...uploadProgress,
            0
        ]);
        /**
         *  파일 추가
         */
        setFiles(prevFiles => {
            return [
                ...prevFiles,
                newFile
            ]
        });
    }

    const handleRemoveFile = (index: number) => {
        const newFiles = files.filter((_, key) => key !== index);
        const newPhotos = photos.filter((_, key) => key !== index);
        const newUploadProgress = uploadProgress.filter((_, key) => key !== index);
        /**
         *  파일 이미지 제거
         */
        setPhotos(newPhotos);
        /**
         *  프로그래스 바 제거
         */
        setUploadProgress(newUploadProgress);
        /**
         *  파일 제거
         */
        setFiles(newFiles);
    }
    /**
     *  upload
     */
    const upload = async(): Promise<Array<string> | undefined> => {
        if(isUploaded === "before" && files.length > 0) {
            setIsUploaded("uploading");
            // console.log("UPLOAD BEFORE");
            // console.log("--------------------------- PROMISE 시작 ---------------------------")
            let urls: Array<string> = [];
    
            const onUpload = async (file: File, key: number) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("api_key", CloudinaryApiKey);
                formData.append('upload_preset', CloudinaryPreset);
                formData.append('timestamp', String(Date.now() / 1000));
        
                const request = await axios.post(CloudinaryURL, formData, {
                    onUploadProgress: (data: ProgressEvent) => {
                        const { loaded, total } = data;
                        const percentCompleted = Math.round((loaded * 100) / total);
                        setTimeout(() => {
                            handleUploadProgress(percentCompleted, key);
                        }, 100);
                    }
                });
        
                if(request) {
                    const { status, statusText } = request;
                    if(status === 200 && statusText === "OK") {
                        const { secure_url } = request.data;
                        urls.push(secure_url);
                        // console.log("**** 전송완료 ****");
                        // console.log("secure_url: ", secure_url);
                    } else {
                        handleMessages({ ok: false, text: "Failed Upload" });
                    }
                } else {
                    handleMessages({ ok: false, text: "Error upload." });
                }
            }
            
            await Promise.all(
                files.map(async (file, key) => {
                    return await onUpload(file, key);
                })
            );

            setIsUploaded("uploaded");
            // console.log("UPLOAD After");
            // console.log("urls: ", urls);
            // console.log("--------------------------- PROMISE 종료 ---------------------------")
            return urls;
        }
        
    }

    
    return {
        files,
        formTitle,
        formDescription,
        progress,
        handleCreatePost,
        handleProgress,
        handleMessages,
        getFilesSize,
        handleAddFile,
        handleRemoveFile,
        photos,
        upload,
        isUploaded,
        uploadProgress
    };
}
const FormPost = () => {
    const { formTitle, formDescription, handleCreatePost, progress, handleProgress, handleMessages,
            files, getFilesSize, handleAddFile, handleRemoveFile, photos, upload, isUploaded, uploadProgress
    } = useFetch();
    return (
        <Container>
            <Wrapper>
                <Form onSubmit={async e => {
                    e.preventDefault();
                    if(!progress) {
                        const { value: title } = formTitle;
                        const { value: description } = formDescription;
                        if(title.length > 0 && description.length > 0) {
                            if(files.length > 0) {
                                const urls: Array<string> | undefined = await upload();
                                if(urls && urls.length > 0) {
                                    handleProgress(true);
                                    handleCreatePost(title, description, urls);
                                } else {
                                    handleMessages({ ok: false, text: "Error: File Upload" });
                                }
                            } else {
                                handleMessages({ ok: false, text: "Please select at least one file" });
                            }
                        } else {
                            handleMessages({ ok: false, text: "Input Title or Description" });
                        }
                    }
                }}>
                    <InputFile 
                        id={"form-1"} 
                        text={"Upload"} 
                        files={files}
                        getFilesSize={getFilesSize}
                        handleAddFile={handleAddFile}
                        handleRemoveFile={handleRemoveFile}
                        photos={photos}
                    />
                    <InputText label={"제목"} id={"title"} {...formTitle } type={"text"}/>
                    <InputText label={"내용"} id={"description"} { ...formDescription } type={"textarea"} />
                    <SubmitButton type={"submit"} value={"Submit"} />
                </Form>
            </Wrapper>
            {/* 모달 추가하기. */}
            {
                isUploaded !== "before" && (
                    <Modal className={"app-modal"}>
                        <ModalWrapper>
                            <ModalHeader className={isUploaded === "uploaded" ? "active" : ""}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
                            </ModalHeader>
                            <ModalContent className={isUploaded === "uploaded" ? "active" : ""}>
                                { isUploaded === "uploading" && "Uploading Data..." }
                                { isUploaded === "uploaded" && "Success Uploaded." }
                            </ModalContent>
                            <ModalGroup>
                                {
                                    uploadProgress.map((progress, key) => 
                                        <ModalItem 
                                            key={key}
                                            src={photos[key]} 
                                            width={progress}
                                        />
                                    )
                                }
                            </ModalGroup>
                            <ModalButtonGroup className={isUploaded === "uploaded" ? "active" : ""}>
                                <ModalButton to={"/"}>Home</ModalButton>
                                <ModalButton to={"/post"}>Post</ModalButton>
                            </ModalButtonGroup>
                        </ModalWrapper>
                    </Modal>
                )
            }
        </Container>
    );
}
const Container = styled.div`

`;
const Wrapper = styled.div`
 
`;
const Form = styled.form`
padding: 20px 0;
    @media(max-width: 510px) {
        // padding: 20px 0;
    }
`;
const SubmitButton = styled.input`
    background-color: #13ab9d;
    padding: 10px 30px;
    border: 0;
    display: block;
    margin-left: auto;
    color: white;
    transition: .2s;
    cursor: pointer;
    &:hover {
        background-color: #24a7a1;
    }
    @media(max-width: 510px) {
        width: 100%;
        padding: 13px;
        border-radius: 3px;
    }
`;

/**  Modal */
const Modal = styled.div`
`;
const ModalWrapper = styled.div`
    position: relative;
    background-color: white;
    width: 90%;
    height: 90%;
    max-width: 650px;
    max-height: 650px;
    border-radius: 6px;
    overflow: hidden;
`;
const ModalGroup = styled.div`
    padding: 10px;
    // overflow-y: scroll;
    // max-height: 500px;
`;
interface IModalItem {
    src: string;
    width: number;
}
const ModalItem: React.FC<IModalItem> = ({src, width}) => (
    <ModalPhotoBox>
        <ModalPhotoImage src={src}/>
        <ModalProgress width={width}/>
        <ModalProgressIcon className={width === 100 ? "active" : ""}>
            {width}%
        </ModalProgressIcon>
    </ModalPhotoBox>
);

const ModalPhotoBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 26px 0;
`;
const ModalPhotoImage = styled.img`
    display: block;
    width: 100%;
    max-width: 60px;
    border: 1px solid #cec8c8;
    border-radius: 6px;
`;
const ModalHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    & svg {
        fill: #35a6ff;
        transition: .2s;
    }
    &.active {
        & svg {
            fill: #c24f19;
        }
    }
    @media(max-width: 510px) {
        height: 150px;
    }
`;
const ModalContent = styled.div`
    text-align: center;
    margin-bottom: 30px;
    color: #35a6ff;
    transition: .3s;
    &.active {
        color: #c24f19;
    }
`;


interface IModalProgress {
    width: number;
}
const ModalProgress = styled.div<IModalProgress>`
    position: relative;
    background-color: white;
    border: 1px solid #dee9e8;
    width: 100%;
    height: 20px;
    transition: .3s;
    margin: 0 10px;
    border-radius: 6px;
    &::after {
        content: "";
        position: absolute;
        width: ${props => props.width}%;
        height: 100%;
        background: linear-gradient(90deg, rgba(83,209,161,1) 0%, rgba(52,189,183,1) 8%, rgba(217,61,0,1) 100%);
        transition: .3s;
        border-top-right-radius: ${props => 100 - props.width}%;
        border-bottom-right-radius: ${props => 100 - props.width}%;
        top: 0;
        left: 0;
    }
`;
const ModalProgressIcon = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    transition: .3s;
    &.active {
        color: #009688;
    }
`;
const ModalButtonGroup = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(100%);
    opacity: 0;
    transition: .3s;
    &.active {
        transform: translateY(0);
        opacity: 1;
    }
`;

const ModalButton = styled(Link)`
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    height: 100%;
    border: 0;
    color: white;
    padding: 15px;
    cursor: pointer;
    &:first-child {
        background-color: #007ee1;
    }
    &:last-child {
        background-color: #ff5722;
    }
    @media(max-width: 510px) {
        padding: 10px;
        font-size: 12px;
    }
`;

export default FormPost;
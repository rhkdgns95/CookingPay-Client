import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    photo: string | null;
    handleChangePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCancelUploaded: any;
    inputFileRef: any;
}
const UploadContainer = () => (
    <UploadIcon className={"update-upload"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-7 6c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4c2.205 0 4 1.794 4 4s-1.795 4-4 4zm7-10c-.553 0-1-.448-1-1s.447-1 1-1 1 .448 1 1-.447 1-1 1z"/></svg>
        <Text>Touch to upload</Text>
    </UploadIcon>
);

const InputPhoto: React.FC<IProps> = ({
    photo,
    handleChangePhoto,
    handleCancelUploaded,
    inputFileRef
}) => {

    return (
        <Container>
            <Wrapper>
                <Input ref={inputFileRef} type={"file"} id={"form_file"} accept="image/*" onChange={handleChangePhoto} />
                <Label className={photo ? "no-empty" : "empty"} htmlFor={"form_file"} url={photo}>
                    {
                        photo && 
                            <CancelBtn className={"active"} onClick={handleCancelUploaded}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                            </CancelBtn>
                    }
                    <UploadContainer/>
                </Label>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
        
`;

const Wrapper = styled.div`
    
`;  

const Input = styled.input` 
    position: absolute;
    top: 0;
    left: 0;
    z-index: -9;
    transform: scale(0);
    opacity: 0;
    pointer-events: none;
`;

interface ILabel {
    url: string | null;
}
const Label = styled.label<ILabel>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    width: 150px;
    height: 150px;
    border: 1px solid #dfdfdf;
    border-radius: 50%;
    margin: auto;
    ${props => props.url ? `background-image: url("${props.url}");` : ``};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 1px 2px 1px rgba(50,50,50,.22);
    cursor: pointer;
    transition: .2s;
    user-select: none;
    &.no-empty {
        & > .update-upload {
            display: flex;
            background-color: rgba(0,0,0,.24);
            & svg {
                fill: red;
            }
            & svg {
                fill: #fb774d;
            }
            & span {
                color: #fb774d;
            }
        }
    }
    
    & svg {
        width: 50px;
        height: 50px;
        fill: #c1c1c1;
        transition: .2s;
    }
    @media(min-width: 511px) {
        &:hover {
            &.empty {
                border: 1px solid #c1c1c1;
                & svg {
                    fill: #b9854c;
                }
                & span {
                    color: #b9854c;
                }
            }
        }
    }
`;
const CancelBtn = styled.div`
    position: absolute;
    top: 15px;
    right: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #ff4a10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    transition: .2s;
    &:hover {
        background-color: #a22700;
        & > svg {
            fill: white;
        }
    }
    & svg {
        fill: white;
        width: 10px;
        height: 10px;
    }
`;
const UploadIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;
const Text = styled.span`
    margin-top: 10px;
    font-size: 12px;
    color: #c1c1c1;
    transition: .2s;
`;

export default InputPhoto;
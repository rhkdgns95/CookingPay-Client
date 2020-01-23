import React, { useState, useEffect } from "react";
import styled from "../../Styles/typed-components";
import { useAppContext } from "../App/AppProvider";


/**
 *  MAX_IMG_SIZE -> 1GB로 제한
 * 
 *  1GB = 1024 MB
 *  1MB = 1024 KB
 *  1KB = 1024 Byte
 *  1Byte = 8 Bit
 * 
 *  Total = 8 * 1024 * 1024
 */

const MAX_IMG_SIZE = 1024 * 1024 * 1;

interface IProps {
    text: string;
    id: string;
    files: Array<File>;
    getFilesSize: () => number;
    handleAddFile: any;
    handleRemoveFile: any;
    photos: Array<string>;
}

const InputFile: React.FC<IProps> = ({
    id,
    text,
    files,
    getFilesSize,
    handleAddFile,
    handleRemoveFile,
    photos,
}) => {
    const [dragged, setDragged] = useState<boolean>(false);
    const { handleMessages } = useAppContext();
    const currentSize = (getFilesSize() / 1024).toFixed(4) + "MB";
    const maxSize = "1024MB";
    
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        const { target: { files: formFiles }} = e;
        if(formFiles) {
            let currentTotal = getFilesSize();
            for(var i = 0; i < formFiles.length; i++) {
                if(currentTotal + formFiles[i].size <= MAX_IMG_SIZE) {
                    currentTotal += formFiles[i].size
                    handleAddFile(formFiles[i]);
                } else {
                    const text: string = "최대 1GB이하의 파일들을 업로드 가능합니다.";
                    handleMessages({ ok: false, text });
                }
            }
        }
    }

    const handleDrop: React.DragEventHandler = (e) => {
        e.preventDefault();
        const { dataTransfer: { files: formFiles }} = e;
        if(formFiles) {
            let currentTotal = getFilesSize();
            for(var i = 0; i < formFiles.length; i++) {
                if(currentTotal + formFiles[i].size <= MAX_IMG_SIZE) {
                    currentTotal += formFiles[i].size
                    handleAddFile(formFiles[i]);
                } else {
                    const text: string = "최대 1GB이하의 파일들을 업로드 가능합니다.";
                    handleMessages({ ok: false, text });
                }
            }
        }
        setDragged(false);
    }
    
    return (
        <Container>
            <Wrapper>
                <Input id={"file_" + id} type={"file"} onLoad={e => console.log("E: ", e)} multiple={true} onChange={handleChange}/>
                {
                    photos.length > 0 && (
                        <>
                            <Size>SIZE: 
                                <SizeText>{ currentSize }</SizeText> 
                                / 
                                <SizeText>{ maxSize }</SizeText> 
                            </Size>
                            <PhotoBox>
                                {
                                    photos.map((item, key) => 
                                        <Photo key={key}>
                                            <Img src={item}/>
                                            <svg onClick={e => handleRemoveFile(key)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                                        </Photo>
                                    )
                                }
                            </PhotoBox>
                        </>
                    )
                }
                <Label className={dragged ? "active" : ""} htmlFor={"file_" + id} onDrop={handleDrop}  
                    onDragLeave={e => {console.log("Out"); setDragged(false); }} 
                    onDragEnter={e => {console.log("Enter"); setDragged(true); }} 
                    onDragOver={e => {e.preventDefault();}}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z"/></svg>
                    {/* { text } */}
                    <div>
                    <StrongText>Drop </StrongText>your file here
                    </div>
                </Label>
            </Wrapper>
        </Container>
    )
};

const Container = styled.div`

`;
const Wrapper = styled.div`
`;
const Size = styled.p`
    margin: 10px 0;
    text-align: right;
    font-size: 12px;
`;  
const SizeText = styled.span`
    margin: 0 10px;
    &:first-child {
        color: #0f14b3;
    }
    &:last-child {
        color: #ff5a5a;
    }
`;
const PhotoBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row wrap;
    background-color: #d9dbe4;
    padding: 30px 0;
    @media(max-width: 510px) {
        // flex-flow: nowrap;
        // overflow-x: scroll;
    }
`;
const Photo = styled.div`
    position: relative;
    width: 100%;
    max-width: 200px;
    margin: 10px auto;
    & svg {
        position: absolute;
        padding: 5px;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        border-radius: 50%;
        cursor: pointer;
        fill: white;
        background-color: #d08282;
    }
    @media(max-width: 510px) {
        width: 44%;
    }
`;
const Img = styled.img`
    display: block;
    width: 100%;
`;
const Input = styled.input`
    position: absolute;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    cursor: default;
    transform: scale(0);
`;
const Label = styled.label` 
    background-color: white;
    border: 3px dotted #27b097;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: #27b097;
    border-radius: 6px;
    font-size: 13px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: .2s;
    margin: 10px 0;
    text-align: center;
    & svg {
        fill: #27b097;
        margin-bottom: 10px;
        transition: .2s;
    }
    @media(min-width: 511px) {
        &.active,
        &:hover {
            background-color: #27b097;
            color: white;
            & svg {
                fill: white;
            }
        }
    }
    @media(max-width: 510px) {
        max-width: 100%;
        padding: 12px;
    }
`;
const StrongText = styled.span`
    font-weight: bold;
`;
export default InputFile
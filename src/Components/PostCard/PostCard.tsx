import React, { useState } from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    title: string;
    description: string;
    imgSrc: Array<any>;
    name: string;
    createdAt: string;
    profile?: string;
};

const PostCard: React.FC<IProps> = ({
    title,
    description,
    imgSrc,
    name,
    createdAt,
    profile
}) => {
    const cursorSpeend: number = 500;
    const [cursor, setCursor] = useState<number>(0);
    const [cursorLoading, setCursorLoading] = useState<boolean>(false);

    const handleCursor = (newCursor: number) => {
        if(!cursorLoading) {
            setCursorLoading(true);
            setCursor(newCursor);
            
            setTimeout(() => {
                setCursorLoading(false);
            }, cursorSpeend);
        }
    }

    return (
        <Container>
            <Wrapper>
                <Card>
                    <PhotoProfile>
                        {
                            profile ? (
                                <UserImage src={profile}/>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg>
                            )
                        }
                        { name }
                    </PhotoProfile>
                    <PhotoTitle>{ title }</PhotoTitle>
                    <PhotoBox>
                        <PhotoScreen cursor={cursor} length={imgSrc.length}>
                            {
                                imgSrc.map((item, key) =>
                                    <Photo key={key}>
                                        <PhotoImg src={item.url} />
                                    </Photo>    
                                )
                            }
                        </PhotoScreen>
                        <>
                            {
                                imgSrc.length > 1 &&
                                cursor > 0 && (
                                    <LeftSide className={"side"} onClick={e => {
                                        if(cursor > 0) { handleCursor(cursor - 1) }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                                    </LeftSide>
                                )
                            }
                            {
                                imgSrc.length > 1 &&
                                cursor < imgSrc.length - 1 && (
                                    <RightSide className={"side"} onClick={e => {
                                        if(cursor < imgSrc.length - 1) { handleCursor(cursor + 1) }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                                    </RightSide>
                                )
                            }
                            
                        </>
                    </PhotoBox>
                    <PhotoDate>{ createdAt }</PhotoDate>
                    <Description>{ description }</Description>
                </Card>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    margin-bottom: 30px;
    max-width: 700px;
`;
const Wrapper = styled.div`
`;
const Card = styled.div`
    border: 1px solid #dfdfdf;
    background-color: white;
`;
const PhotoProfile = styled.p`
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    & svg {
        fill: #4e4e4e;
    }
    & svg,
    & img {
        margin-right: 10px;
    }
`;
const UserImage = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
`;
const PhotoTitle = styled.h5`
    background-color: black;
    color: white;
    text-align: center;
    padding: 10px;
`;
const PhotoBox = styled.div`
    position: relative;
    width: 100%;
    min-height: 610px;
    height: auto;
    background-color: black;
    user-select: none;
    overflow: hidden;
    @media(min-width: 911px) {
        &:hover {
            .side {
                transform: translateX(0);
                opacity: 1;
                &.left {
                    left: 0;
                }
                &.right {
                    right: 0;
                }
            }
        }
    }
`;
interface IPhotoScreen {
    cursor: number;
    length: number;
}
const PhotoScreen = styled.div<IPhotoScreen>`
    position: absolute;
    display: flex;
    top: 0;
    left: -${props => props.cursor * 100}%;
    height: 100%;
    width: ${props => props.length * 100}%;
    // padding-bottom: 100%;
    transition: .3s;
    transition-timing-function: ease-in;
    border-top: .5px solid white;
    border-bottom: .5px solid white;
`;
const Photo = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
const PhotoImg = styled.img`
    max-width: 100%;
    min-width: 50%;
    margin: 0 auto;
`;
const PhotoDate = styled.p`
    font-size: 13px;
    padding: 10px;
    text-align: right;
    background-color: black;
    color: white;
`;

const Description = styled.p`
    padding: 10px;
    font-size: 14px;
`;
const Side = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 60px;
    transition: .2s;
    cursor: pointer;
    & svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        background-color: black;
        fill: white;
    }
    @media(min-width: 911px) {
        opacity: 0;
        &:hover {
            background-color: rgba(250,250,250,.1);
        }
    }
`;
const LeftSide = styled(Side)`
    @media(min-width: 911px) {
        transform: translateX(-100%);
    }
    & svg {
        transform: translate(-50%, -50%) rotateY(180deg);
    }
`;
const RightSide = styled(Side)`
    left: auto;
    right: 0;
    @media(min-width: 911px) {
        transform: translateX(100%);
    }
`;
export default PostCard;
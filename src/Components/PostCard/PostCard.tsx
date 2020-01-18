import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    title: string;
    description: string;
    imgSrc: string;
    name: string;
    createdAt: string;
};

const PostCard: React.FC<IProps> = ({
    title,
    description,
    imgSrc,
    name,
    createdAt
}) => (
    <Container>
        <Wrapper>
            <Card>
                <PhotoBox>
                    <Effects className={"post-effect"}>
                        <EffectItem />
                        <EffectItem />
                        <EffectItem />
                        <EffectItem />
                    </Effects>
                    <Photo src={imgSrc}/>
                    <PhotoText>
                        <Title>{ title }</Title>
                        <Description>{ description }</Description>
                    </PhotoText>
                    <PhotoName>{ name }</PhotoName>
                    <PhotoDate>{ createdAt }</PhotoDate>
                </PhotoBox>
            </Card>
        </Wrapper>
    </Container>
);

const Container = styled.div`
    max-width: 300px;
`;

const Wrapper = styled.div`

`;
const Card = styled.div`
    
`;
const PhotoBox = styled.div`
    position: relative;
    &::after,
    &::before {
        // content: "";
        // position: absolute;
        // top: 0;
        // left: 0;
        // width: 100%;
        // height: 100%;
        // 
    }
    &:hover {
        .post-effect {
            & > div {
                &:nth-child(odd) {
                    width: 0;
                    transition: .3s;
                    transition-timing-function: ease-in-out;
                }
                &:nth-child(2n) {
                    height: 0;
                    transition: .2s;
                    transition-delay: .25s;
                    transition-timing-function: ease-in-out;
                }
            }
        }
    }
`;
const Effects = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(10,150,150,.32);
    & > div {
        &:nth-of-type(1) {
            top: 0;
            right: 50%;
        }
        &:nth-of-type(2) {
            bottom: 50%;
            right: 0;
        }
        &:nth-of-type(3) {
            bottom: 0;
            left: 50%;
        }
        &:nth-of-type(4) {
            top: 50%;
            left: 0;
        }
    }
    
`;
const EffectItem = styled.div`
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: rgba(0,0,0,.25);
    &:nth-of-type(2n + 1) {
        transition: .2s;
        transition-timing-function: ease-in;
    }
    &:nth-of-type(2n) {
        transition: .2s;
        transition-timing-function: ease-in;
    }
`;

const Photo = styled.img`
    display: block;
    width: 100%;
`;
const PhotoName = styled.span`
    position: absolute;
    top: 5px;
    left: 5px;
    color: white;
    font-size: 12px;
    text-shadow: 0 1px 1px rgba(0,0,0,.94);
`;
const PhotoDate = styled.span`
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: white;
    font-size: 12px;
    text-shadow: 0 1px 1px rgba(0,0,0,.94);
`;
const PhotoText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-shadow: 0 1px 1px rgba(0,0,0,.94);
`;
const Title = styled.h5`
    white-space: nowrap;
    position: relative;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 7px;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    max-width: 150px;
    text-shadow: 0 1px 1px rgba(0,0,0,.94);
`;
const Description = styled.p`
    position: relative;
    white-space: nowrap;
    position: relative;
    text-align: center;
    margin-bottom: 7px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    max-width: 200px;
    text-shadow: 0 1px 1px rgba(0,0,0,.94);
`;

export default PostCard;
import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    photo: string | null;
    isMine: boolean;
    text: string;
    date: string;
    userName: string;
};

const TmpProfile = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>;

const ChatMessage: React.FC<IProps> = ({
    photo,
    isMine,
    text,
    date,
    userName
}) => (
    <Container>
        <Wrapper className={isMine ? "active" : ""}>
            <Photo url={photo}>
                { !photo &&  <TmpProfile/> }
                <UserName className={isMine ? "active" : ""}>{ isMine ? "Me" : userName }</UserName>
            </Photo>
            <Info className={isMine ? "active" : ""}>
                <Message className={isMine ? "active" : ""} value={text} readOnly={true}/>
                <Date className={isMine ? "active" : ""}>{date}</Date>
            </Info>
        </Wrapper>
    </Container>
);

const Container = styled.div`
    position: relative;
    margin-top: 15px;
    margin-bottom: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    &.active {
        align-items: flex-end;
        flex-direction: row-reverse;
    }
`;

interface IPhoto {
    url: string | null;
}
const Photo = styled.div<IPhoto>`
    border-radius: 50%;
    border: 1px solid #585858;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    & svg {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 1px;
    }
    background-size: cover;
    background-position: center;
    ${props => props.url ? `background-image: url("${props.url}");` : ``}
`;
const UserName = styled.span`
    position: absolute;
    margin-top: 12px;
    font-size: 10px;
    max-width: 50px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    transform: translateY(100%);
    color: #727e99;
    &.active {
        transform: translateY(-100%);
        margin-top: 0;
        margin-bottom: 20px;
    }
`;
// const PhotoImg = styled.img`
//     max-width: 100%;
//     display: block;
//     margin: 0 auto;
//     height: 100%;
//     border-radius: 50%;
// `;
const Info = styled.div`
    position: relative;
    margin: 0 15px;
    
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 100%;
        width:0px;
        height:0px;
        transform: rotateZ(0deg);
        border-left: 7.5px solid transparent; 
        border-top: 7.5px solid #e4e4ea;
    }
    &.active {
        &::after {
            top: auto;
            right: auto;
            left: 100%;
            bottom: 0;
            transform: rotateZ(180deg);
            border-left: 7.5px solid transparent; 
            border-top: 7.5px solid #675dfc;
        }
    }
`;
const Message = styled.textarea`
    // display: flex;
    display: block;
    align-items: center;
    // width: 100%;
    resize: none;
    padding: 7.5px 10px;
    height: auto;
    text-shadow: 0 .5px .5px rgba(50,20,50,.3);
    border-radius: 4px;
    color: #5c5c5c;
    background-color: #e4e4ea;
    border: 0;
    border-top-left-radius: 0;

    &:focus,
    &:active {
        outline: none;
    }
    
    &.active {
        border-top-left-radius: 4px;
        border-bottom-right-radius: 0;
        color: white;
        background: linear-gradient(150deg, rgba(86,79,195,1) 0%, rgba(104,94,255,1) 100%);
    }


`;
const Date = styled.div`
    position: absolute;
    top: 101%;
    right: 0;
    text-align: right;
    font-size: 10px;
    &.active {
        left: 0;
        text-align: left;
    }
`;
export default ChatMessage;
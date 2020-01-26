import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    photo?: string;
    isMine: boolean;
    text: string;
    date: string;
};

const TmpProfile = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>;

const ChatMessage: React.FC<IProps> = ({
    photo,
    isMine,
    text,
    date
}) => (
    <Container>
        <Wrapper className={isMine ? "active" : ""}>
            <Photo url={photo}>
                { !photo &&  <TmpProfile/> }
            </Photo>
            <Info>
                <Message className={isMine ? "active" : ""} value={text} readOnly={true}/>
                <Date className={isMine ? "active" : ""}>{date}</Date>
            </Info>
        </Wrapper>
    </Container>
);

const Container = styled.div`
    margin-top: 15px;
    margin-bottom: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    &.active {
        flex-direction: row-reverse;
    }
`;
interface IPhoto {
    url?: string;
}
const Photo = styled.div<IPhoto>`
    border-radius: 50%;
    border: 1px solid #585858;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 1px;
    }
    background-size: cover;
    background-position: center;
    ${props => props.url ? `background-image: url("${props.url}");` : ``}
`;
// const PhotoImg = styled.img`
//     max-width: 100%;
//     display: block;
//     margin: 0 auto;
//     height: 100%;
//     border-radius: 50%;
// `;
const Info = styled.div`

`;
const Message = styled.textarea`
    // display: flex;
    align-items: center;
    // width: 100%;
    resize: none;
    padding: 7.5px 10px;
    height: auto;
    margin: 0 3px;
    &:focus,
    &:active {
        outline: none;
    }
    text-shadow: 0 .5px .5px rgba(50,20,50,.3);
    border-radius: 4px;
    color: #5c5c5c;
    background-color: #e4e4ea;
    border: 0;
    &.active {
        color: white;
        background: linear-gradient(150deg, rgba(46,115,193,1) 0%, rgba(93,157,255,1) 100%);
    }
`;
const Date = styled.div`
    text-align: right;
    height: 0;
    margin-top: -3px;
    font-size: 10px;
    &.active {
        text-align: left;
    }
`;
export default ChatMessage;
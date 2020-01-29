import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    photo: string | null;
    name: string;
}
const ChatProfile: React.FC<IProps> = ({
    photo,
    name
}) => (
    <Container>
        <Wrapper> 
            <Photo url={photo}>
                { !photo && TmpPhoto() }
            </Photo>
            <Name>
                { name }
            </Name>
        </Wrapper>
    </Container>
);

const Container = styled.div`
    position: relative;
    width: 100%;
    @media(max-width: 910px) {
        display: none;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    @media(max-width: 910px) {
        display: flex;
        justify-content: center;
    }
`;
const TmpPhoto = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>;

interface IPhoto {
    url: string | null;
}
const Photo = styled.div<IPhoto>`
    border-radius: 50%;
    border: 1px solid #ffffff;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    & svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 1px;
    }
    background-size: cover;
    background-position: center;
    ${props => props.url ? `background-image: url("${props.url}");` : ``}
    @media(max-width: 910px) {
        position: absolute;
        top: 0;
        transform: translateY(-50%);
        margin: 0;
    }
`;
const Name = styled.span`
    width: 100%;
    margin-top: 20px;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    text-align: center;
    color: white;
    font-weight: bold;
    letter-spacing: .5px;
    @media(max-width: 910px) {
        width: auto;
    }
`;
export default ChatProfile;
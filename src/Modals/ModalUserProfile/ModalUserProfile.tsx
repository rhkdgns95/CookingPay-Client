import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    userName: string;
    userPhoto: string | null;
    userEmail: string;
    toggleClick: () => any;
}

const TmpPhoto = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>;

const ModalUserProfile: React.FC<IProps> = ({
    userName,
    userPhoto,
    userEmail,
    toggleClick
}) => (
    <Container onClick={toggleClick}>
        <Wrapper onClick={e => e.stopPropagation()}>
            <Bg>
                <BgLeft />
                <BgRight />
            </Bg>
            <CloseBtn onClick={toggleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            </CloseBtn>
            <Photo url={userPhoto}>
                { !userPhoto && <TmpPhoto /> }
            </Photo>
            <Name>{ userName }</Name>
            <Email>{ userEmail }</Email>
            {/* 1:1 관계 메뉴란 */}
            <BottomMenu>
                <Menu onClick={e => alert("서비스 준비중입니다.")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"/></svg>
                    <MenuName>1:1 채팅</MenuName>
                </Menu>
                <Menu onClick={e => alert("서비스 준비중입니다.")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M20 0v2h-18v18h-2v-20h20zm3.889 22.333l-4.76-4.761c.51-.809.809-1.764.809-2.791 0-2.9-2.35-5.25-5.25-5.25s-5.25 2.35-5.25 5.25 2.35 5.25 5.25 5.25c1.027 0 1.982-.299 2.791-.809l4.761 4.76 1.649-1.649zm-13.201-7.552c0-2.205 1.795-4 4-4s4 1.795 4 4-1.795 4-4 4-4-1.795-4-4zm6.74 7.219h-11.428v-16h16v11.615l2 2v-15.615h-20v20h15.428l-2-2z"/></svg>
                    <MenuName>활동보기</MenuName>
                </Menu>
            </BottomMenu>
        </Wrapper>
    </Container>
);

const Container = styled.div`
    z-index: 2;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.72);
    cursor: pointer;
`;
const Wrapper = styled.div`
    position: relative;
    display: flex;
    width: 90%;
    height: 90%;
    max-width: 400px;
    max-height: 500px;
    // background-color: white;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: default;
`;
const Bg = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: white;
`;
const BgItem = styled.div`
    position: relative;
    width: 50%;
    height: 100%;
    &::before {
        content: "";
        background-color: #ff5151;
        position: absolute;
        top: -2px;
        left: -2px;
        width: 90%;
        height: 90%;
        transform: skew(2deg, 2deg);
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
    }
`
const BgLeft = styled(BgItem)`
    
`;
const BgRight = styled(BgItem)`
    left: auto;
    right: 0;
    &::before {
        background-color: #ff8e4c;
        top: auto;
        left: auto;
        bottom: -2px;
        right: -2px;
        transform: skew(2deg, 2deg);
    }
    &::after {
        background-color: #ececec;
    }
`;
const CloseBtn = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    
    & svg {
        transition: .1s;
        fill: #c3c3c3;
    }
    &:hover {
        & svg {
            fill: #e87e7e;
        }   
    }
`;
interface IPhoto {
    url: string | null;
}

const Photo = styled.div<IPhoto>`
    width: 100%;
    border-radius: 50%;
    border: 1px solid #585858;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
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
const Name = styled.p`
    width: 100%;
    margin: 20px 0;
    font-size: 24px;
    color: #0e1a46;
`;
const Email = styled.p`
    width: 100%;
`;
const BottomMenu = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #dfdfdf;
    background-color: white;
    & > div {
        flex: 1;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 10px;
    cursor: pointer;
    transition: .2s;
    & svg {
        fill: #8f8f8f;
        transition: .2s;
    }
    color: #373737;
    @media(min-width: 911px) {
        &:hover {
            background-color: #14b270;
            color: white;
            & svg {
                fill: white;
            }
        }
    }
`;
const MenuName = styled.span`
    font-size: 11px;
    text-align: center;
    margin-top: 6px;
`;

export default ModalUserProfile;
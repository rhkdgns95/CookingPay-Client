import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import { useMutation } from "react-apollo";
import { LOGGED_OUT } from "../../Routes/Login/LoginQueries.local";
import { Link } from "react-router-dom";
import { useUserContext } from "../User/User";

interface IProps {
    toggleLogin?: () => any;
    menu?: "post" | "notice" | "donate" | "consult";
}
const useFetch = () => {
    const [ logoutMutation ] = useMutation(LOGGED_OUT, {
        onCompleted: data => {
            // console.log("LoggedOut onCompleted: ", data);
        },
        onError: data => {
            console.log("LoggedOut onError: ", data);
        }
    });
    
    return {
        logoutMutation,
    };
}
const ClosePath = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>;
const OpenPath = () => <svg fill={"#767676"} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>;
const NavBar: React.FC<IProps> = ({
    // name,
    toggleLogin,
    menu
}) => {
    const { user } = useUserContext();
    const { logoutMutation } = useFetch();
    const [ isBar, setIsBar ] = useState<boolean>(false);
    
    const toggleBar = () => {
        setIsBar(!isBar);
    }
    
    const TmpPhoto = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>;

    return (
        <Container>
            <Bg className={`${isBar ? "active" : ""}`} onClick={toggleBar}/>
            <Wrapper className={"row"}>
                <NavGroup>
                    <MainLink to={"/"}>C∞KING-PAY</MainLink>
                    <NavItem className={`nav-link-item ${menu === "post" ? "active" : ""}`} to={"/post"}>Post</NavItem>
                    <NavItem className={`nav-link-item ${menu === "notice" ? "active" : ""}`} to={"/"}>Notice</NavItem>
                    <NavItem className={`nav-link-item ${menu === "donate" ? "active" : ""}`} to={"/"}>Donate</NavItem>
                    <NavItem className={`nav-link-item ${menu === "consult" ? "active" : ""}`} to={"/"}>Consult</NavItem>
                </NavGroup>
                <ToggleBgBtn className={isBar ? "active" : ""} onClick={toggleBar}>
                    {
                        isBar ? <ClosePath/> : <OpenPath />
                    }
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg> */}
                </ToggleBgBtn>
                <NavGroup className={`nav-menu-group ${isBar ? "active" : ""}`}>
                    { user ? <>
                                <Photo url={ user.photo }> 
                                    { !user.photo && <TmpPhoto />}
                                </Photo>
                                <Name>{ user.name }</Name>
                                <NavItem to={"/my-page"}>MyPage</NavItem>
                                <LogoutBtn onClick={e => logoutMutation()}>Logout</LogoutBtn>
                            </> :
                            <>
                                <LogoutBtn onClick={toggleLogin}>Login</LogoutBtn>
                            </>
                    }
                </NavGroup>
            </Wrapper>
        </Container>
    )
};

const Container = styled.div`
    position: relative;
    background-color: white;
    color: #909090;
    border-bottom: 2px solid #2586ca;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Bg = styled.div`
    display: none;
    @media(max-width: 911px) {
        display: block;
        z-index: 1;
        position: fixed;
        left: 0;
        top: 0;
        width: 0;
        opacity: 0;
        height: 100%;
        transition: .3s;
        background-color: rgba(0,0,0,.5);
        &.active {
            width: 70%;
            opacity: 1;
        }
    }
    
`;
const ToggleBgBtn = styled.div`
    position: absolute;
    right: 7px;
    top: 9px;
    display: none;
    z-index: 2;
    cursor: pointer;
    & svg {
        fill: #767676;
    }
    &.active {
        position: fixed;
        & svg {
            fill: #213767;
        }
    }
    @media(max-width: 910px) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: inherit;
    }
    @media(max-width: 510px) {
        padding: 7px;
    }
`;
const NavGroup = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
    @media(max-width: 910px) {
        &.nav-menu-group {
            z-index: 1;
            position: fixed;
            flex-flow: column;
            align-items: center;
            top: 0;
            right: 0;
            width: 30%;
            min-width: 200px;
            height: 100%;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 -1px 0 2px rgba(50,450,100,.2), 0 -3px 0 3px rgba(20,50,50,.1);
            transform: translateX(105%);
            opacity: 0;
            transition: .2s;
            a {
                background-color: #213767;
                color: white;
                &:hover {
                    background-color: black;
                }
            }
            & > * {
                text-align: center;
                margin: 10px 0;
                padding: 7.5px 18px;
                font-size: 13px;
                border-radius: 2px;
                &:last-child {
                    margin-top: auto;
                    background-color: black;
                    color: white;
                }
                transition: .2s;
            }
            &.active {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
`;
const MainLink = styled(Link)`
    font-size: 22px;
    margin-right: 10px;
    color: #064d7f;
    @media(max-width: 510px) {
        font-size: 16px;
    }
`;
const NavItem = styled(Link)`
    font-size: 15px;
    margin: 0 10px;
    padding: 15px 0px;
    transition: .2s;
    &:hover {
        color: #0089ff;
    }
    &.active {
        position: relative;
        &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-top: 0 solid white;
            border-right: 10px solid white;
            border-bottom: 10px solid #2586ca;
            border-left: 10px solid white;
        }
        // border-top-left-radius: 30px;
        // border-bottom-right-radius: 30px;
        // background-color: #0089ff;
        color: #0089ff;
    }
    @media(max-width: 910px) {
        &.nav-link-item {
            font-size: 11px;
            margin: 0 6px;
        }
    }
    @media(max-width: 510px) {
        padding: 15px 7px;
        &.nav-link-item {
            margin: 0;
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
    width: 30px;
    height: 30px;
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
    @media(max-width: 910px) {
        & {
            width: 100px;
            height: 100px;
            border-radius: 50% !important;
        }
    }
`;
const Name = styled.span`
    
`;
const LogoutBtn = styled.button`
    padding: 7.5px 10px;
    background-color: white;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
    transition: .3s;
    &:hover {
        background-color: #0089ff;
        color: white;
        border: 1px solid #0089ff;
    }
`;

export default NavBar;
import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import { useMutation } from "react-apollo";
import { LOGGED_OUT } from "../../Routes/Login/LoginQueries.local";
import { Link } from "react-router-dom";

interface IProps {
    name?: string;
    toggleLogin?: () => any;
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
const OpenPath = () => <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>;
const NavBar: React.FC<IProps> = ({
    name,
    toggleLogin
}) => {
    const { logoutMutation } = useFetch();
    const [ isBar, setIsBar ] = useState<boolean>(false);
    
    const toggleBar = () => {
        setIsBar(!isBar);
    }
    
    return (
        <Container>
            <Bg className={`${isBar ? "active" : ""}`} onClick={toggleBar}/>
            <Wrapper className={"row"}>
                <NavGroup>
                    <MainLink to={"/"}>Home</MainLink>
                    <NavItem className={'nav-link-item'} to={"/post"}>Post</NavItem>
                    <NavItem className={'nav-link-item'} to={"/"}>Notice</NavItem>
                    <NavItem className={'nav-link-item'}to={"/"}>Donate</NavItem>
                    <NavItem className={'nav-link-item'} to={"/"}>Consult</NavItem>
                </NavGroup>
                <ToggleBgBtn className={isBar ? "active" : ""} onClick={toggleBar}>
                    {
                        isBar ? <ClosePath/> : <OpenPath />
                    }
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg> */}
                </ToggleBgBtn>
                <NavGroup className={`nav-menu-group ${isBar ? "active" : ""}`}>
                    { name ? <>
                                <Name>{ name }</Name>
                                <NavItem to={"/"}>MyPage</NavItem>
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
    background-color: #183e70;
    color: white;
`;
const Wrapper = styled.div`
    display: flex;
    padding: 12.5px 0;
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
    right: 10px;
    top: 10px;
    display: none;
    z-index: 2;
    cursor: pointer;
    & svg {
        fill: white;
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
                &:hover {
                    background-color: black;
                }
            }
            & > * {
                text-align: center;
                margin: 10px 0;
                padding: 7.5px 18px;
                font-size: 13px;
                border-radius: 4px;
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
    margin-bottom: 3.5px;
    @media(max-width: 510px) {
        font-size: 16px;
    }
`;
const NavItem = styled(Link)`
    font-size: 15px;
    margin: 0 10px;
    @media(max-width: 910px) {
        &.nav-link-item {
            font-size: 11px;
            margin: 0 6px;
        }
    }
`;
const Name = styled.span`
    
`;
const LogoutBtn = styled.button`
    padding: 7.5px 10px;
    background-color: white;
    border: 1px solid #dfdfdf;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
    transition: .3s;
    &:hover {
        background-color: black;
        color: white;
        border: 1px solid black;
    }
`;

export default NavBar;
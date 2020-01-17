import React from "react";
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
        logoutMutation
    };
}

const NavBar: React.FC<IProps> = ({
    name,
    toggleLogin
}) => {
    const { logoutMutation } = useFetch();

    return (
        <Container>
            <Wrapper className={"row"}>
                <NavGroup>
                    <MainLink to={"/"}>Home</MainLink>
                    <NavItem to={"/post"}>Post</NavItem>
                    <NavItem to={"/"}>Notice</NavItem>
                    <NavItem to={"/"}>Donate</NavItem>
                    <NavItem to={"/"}>Consult</NavItem>
                </NavGroup>
                <NavGroup>
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
    background-color: #363152;
    color: white;
`;
const Wrapper = styled.div`
    display: flex;
    padding: 12.5px 0;
    justify-content: space-between;
    align-items: center;
`;

const NavGroup = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
`;
const MainLink = styled(Link)`
    font-size: 22px;
    margin-right: 10px;
`;
const NavItem = styled(Link)`
    font-size: 15px;
    margin: 0 10px;
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
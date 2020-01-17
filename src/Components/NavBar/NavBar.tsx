import React from "react";
import styled from "../../Styles/typed-components";
import { useMutation } from "react-apollo";
import { LOGGED_OUT } from "../../Routes/Login/LoginQueries.local";

interface IProps {
    name: string;
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
    name
}) => {
    const { logoutMutation } = useFetch();

    return (
        <Container>
            <Wrapper>
                <NavGroup>Home</NavGroup>
                <NavGroup>
                    <Name>{ name }</Name>
                    <LogoutBtn onClick={e => logoutMutation()}>Logout</LogoutBtn>
                </NavGroup>
            </Wrapper>
        </Container>
    )
};

const Container = styled.div`
    
`;
const Wrapper = styled.div`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
`;
const NavGroup = styled.div`
    font-size: 14px;
    display: flex;
    align-items: center;
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